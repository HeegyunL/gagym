package com.git.Helloproducer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelloProducerService {

	private RabbitTemplate rabbit;

	@Autowired
	public HelloProducerService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}

	public void sendMessage(byte[] message) {
		rabbit.send("service.diary.create", new Message(message));
	}
}
