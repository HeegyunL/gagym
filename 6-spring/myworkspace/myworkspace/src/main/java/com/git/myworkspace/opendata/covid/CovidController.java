package com.git.myworkspace.opendata.covid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component("covidController")
@RestController
@RequestMapping("opendata/covid")
public class CovidController {
	private CovidSidoDailyRepository repo;
	private final String cachName = "covid-current";

	@Autowired
	public CovidController(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}
	//1.전국 데이터 조회
	//page size(limit)를 19개 , 정렬은 stdDay desc;
	@Cacheable(value = cachName, key="'all'")
	@GetMapping(value="/sido/current")
	public List<CovidSidoDaily> getCovidCurrent(){
		return repo.findAll(PageRequest.of(0, 19,Sort.by("stdDay").descending())).toList();

	}

	//2.특정 시도의 데이터 조회
	//검색조건에 gubun, page size(limit)를 7(7일간의 데이터), 정렬은 stdDay desc
	//예)WHERE gubun = 서울 ORDER BY std_day DESC LIMIT 7;

	@Cacheable(value=cachName, key="#gubun")
	@GetMapping(value = "/sido/current/{gubun}")
	public List<CovidSidoDaily> getCovidCurrent(@PathVariable String gubun){
		Pageable page = PageRequest.of(0, 14,Sort.by("stdDay").descending());
		return repo.findByGubun(page, gubun);
	}
}
