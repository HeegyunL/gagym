package com.git.gagymservice.partner;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class PartnerService {

	private RabbitTemplate rabbit;

	private PartnerService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}
//	queue로 데이터 보내기 
	public void sendPartner(Partner partner) {
		System.out.println(partner);
		rabbit.convertAndSend("service.gym.create1", partner);
		rabbit.convertAndSend("service.gym.create2", partner);
	}
}