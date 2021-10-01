package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
//import java.util.ArrayList;
import java.util.Date;
//import java.util.List;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class CovidService {
	private final String SERVICE_KEY = "Ev3%2FzqFtlqN%2BzmGpmkNJHdIBga81m1Pbk5ZBWjDuy71cyySLvKaetXQzHjqAijSDSNYxuPazSYHvBFPd2Z6VWw%3D%3D";
	
	private CovidCountRepository repo;
	
	
	@Autowired
	public CovidService(CovidCountRepository repo) {
		this.repo = repo;
	}
	
	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	public void requestCovid() throws IOException {
		String[] gubuns = {"����"};
		for(String gubun : gubuns) {
			requestCovidCountHour(gubun);
		}
	}
	
	@SuppressWarnings("deprecation")
	public void requestCovidCountHour(String gubun) throws IOException {
		System.out.println(new Date().toLocaleString());
		
		
//		http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=Ev3%2FzqFtlqN%2BzmGpmkNJHdIBga81m1Pbk5ZBWjDuy71cyySLvKaetXQzHjqAijSDSNYxuPazSYHvBFPd2Z6VWw%3D%3D
//		&pageNo=1&numOfRows=10&startCreateDt=20200410&endCreateDt=20200410
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi");	//ȣ��Ʈ/����Ʈ���� 
		builder.append("/service/rest/Covid19");	//����
		builder.append("/getCovid19SidoInfStateJson"); //���
		builder.append("?serviceKey=" + SERVICE_KEY);
		builder.append("&pageNo=1&numOfRows=10");
		builder.append("&startCreateDt=20200410&endCreateDt=20200410");
		
		System.out.println(builder.toString());//�ùٸ� �ּҸ� �����ߴ��� Ȯ��!
		
		URL url = new URL(builder.toString());
		
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		byte[] result = con.getInputStream().readAllBytes(); 
		
		
		String data = new String(result, "UTF-8");
		
//		System.out.println(data);
//		-----------------������ ��û�ϰ� XML �޾ƿ��� ��-------------------
		
		 
//		-----------------XML -> JSON -> Object(JAVA) start-----------------
		String json = XML.toJSONObject(data).toString(2);
//		System.out.println(json);
		
		CovidCountResponse response = new Gson().fromJson(json,CovidCountResponse.class);
		System.out.println(response);
//		CovidCountResponse.Item item= response.getResponse().getBody().getItems().getItem().get(1);
//		System.out.println(item);
//		
//		-----------------XML -> JSON -> Object(JAVA) end -----------------
		
//		-----------------���� ��ü -> ��ƼƼ ���� -----------------
		List<CovidCount> list = new ArrayList<CovidCount>();
		for (CovidCountResponse.Item item: response.getResponse().getBody().getItems().getItem()){
			CovidCount record = CovidCount.builder()
								.stdDay(item.getStdDay())
								.updateDt(item.getUpdateDt())
								.gubun(item.getGubun())
								.defCnt(item.getDefCnt())
								.build();
			
			list.add(record);
		}
//		-----------------���� ��ü -> ��ƼƼ �� -----------------
//		-----------------��ƼƼ ��ü -> �������͸�  ���� ���� -----------------
		repo.saveAll(list);
//		-----------------��ƼƼ ��ü -> �������͸�  ���� �� -----------------
		
	}

}
 