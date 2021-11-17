package com.git.partnerMq.partner;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class PartnerController {
	private PartnerService service;

	public PartnerController(PartnerService service) {
		this.service = service;
	}

	@PostMapping(value = "/partner")
	public PartnerCreateResponse addPartner(@RequestBody Partner partner) {

		// 데이터 검증

		// DB에 저장할 객체 생성
		Partner partnerMq = Partner.builder()
				.gymName(partner.getGymName()).gymCoNum(partner.getGymCoNum()).gymLocateSi(partner.getGymLocateSi())
				.gymLocateGunGu(partner.getGymLocateGunGu()).gymAddress(partner.getGymAddress()).gymPhoneNum(partner.getGymPhoneNum())
				.gymTime(partner.getGymTime()).gymService(partner.getGymService())
				.gymPhoto(partner.getGymPhoto()).fileType(partner.getFileType())
				.fileName(partner.getFileName())
				.gym1DayPrice(partner.getGym1DayPrice())
				.gym3DayPrice(partner.getGym3DayPrice()).gym7DayPrice(partner.getGym7DayPrice())
				.gym3MonthPrice(partner.getGymMonthPrice()).gym3MonthPrice(partner.getGym3MonthPrice()).gym6MonthPrice(partner.getGym6MonthPrice())
				.gymYearPrice(partner.getGymYearPrice())
				.build();

		// DB에 저장
		// repo.save(product)

		// (event)외부 시스템에 추가된 데이터 보내기
		service.sendPartner(partner);

		return PartnerCreateResponse.builder().partner(partnerMq).build();
	}
}