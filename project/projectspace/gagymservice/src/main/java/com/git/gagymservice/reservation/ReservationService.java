package com.git.gagymservice.reservation;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
	ReservationRepository repo;
	
	
	public ReservationService(ReservationRepository repo) {
		this.repo = repo;
	}
// queue로부터 데이터 받기  
	@RabbitListener(queues="service.reservation.create")
	public void receiveReservation(Reservation reservation){
		saveReservation(reservation); 
		System.out.println("-- service.reservation.create --");
		System.out.println(reservation);
		
	}
	
	public Reservation saveReservation(Reservation reservation) {
		Reservation saveReservation = Reservation.builder()
				.memberName(reservation.getMemberName())
				.memberPhone(reservation.getMemberPhone())
				.memberRequest(reservation.getMemberRequest())
				.gymName(reservation.getGymName())
				.trainerName(reservation.getTrainerName())
				.boughtService(reservation.getBoughtService())
				.build();
		repo.save(saveReservation);
		return saveReservation;
	}
	
}
