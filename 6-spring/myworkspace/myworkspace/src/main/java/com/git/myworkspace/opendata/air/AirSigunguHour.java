package com.git.myworkspace.opendata.air;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name="idx_air_si_gun_gu_hour_1", columnList="sidoName, cityName"))
@IdClass(AirSigunguHourId.class)
public class AirSigunguHour {
	
	//�ð� , ����1, ����2
	//2021-09-30 14:00 , ����, ������
	//24,3,2,3,3,2,
	
	//dataTime, sidoName, cityName �����ϸ� ������ PK ���� �� ����
	// ���ϼ�, �ּҼ�, ��ǥ��
	@Id
	private String dataTime;
	@Id
	private String sidoName;	//�е��� Ŀ���� 5%, �������� Ŀ���� 20, �ε��� ����
	@Id
	private String cityName;
	
	//��
	private String pm10Value;
	private String pm25Value;

		

}
