package com.git.gagymservice.trainer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class TrainerService {

	private RabbitTemplate rabbit;

	private TrainerService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}
//	queue로 데이터 보내기 
	public void sendTrainer(Trainer trainer) {
		System.out.println(trainer);
		rabbit.convertAndSend("service.trainer.create1", trainer);
		rabbit.convertAndSend("service.trainer.create2", trainer);
	}
}