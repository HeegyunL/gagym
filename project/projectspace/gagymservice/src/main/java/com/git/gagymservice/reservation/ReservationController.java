package com.git.gagymservice.reservation;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ReservationController {
	private ReservationService service;
	private ReservationRepository repo;
	
	@Autowired
	public ReservationController(ReservationRepository repo, ReservationService service) {
		this.service = service;
		this.repo = repo;
	}
	
	@GetMapping(value = "/reservation")
	public List<Reservation>getReservation() throws InterruptedException{
		return repo.findAll(Sort.by("id").descending());
	}
	
	@PostMapping(value="/reservation")
	public Reservation addReservation(@RequestBody Reservation reservation, HttpServletResponse res) throws InterruptedException{
		Reservation reservationItem = Reservation.builder()
				.memberName(reservation.getMemberName()).memberPhone(reservation.getMemberPhone()).memberRequest(reservation.getMemberRequest())
				.gymName(reservation.getGymName()).trainerName(reservation.getTrainerName()).boughtService(reservation.getBoughtService())
				.build();
		Reservation reservationSaved = repo.save(reservationItem);
		res.setStatus(HttpServletResponse.SC_CREATED);
		return reservationSaved;
	}
	
	@DeleteMapping(value="/reservation/{id}")
	public boolean removeReservation(@PathVariable long id,HttpServletResponse res )throws InterruptedException{
		Optional<Reservation>reservation = repo.findById(id);
		if(reservation.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		repo.deleteById(id);
		return true;
	}
	@PutMapping(value="/reservation/{id}")
	public Reservation modifyReservation(@PathVariable long id, @RequestBody Reservation reservation, HttpServletResponse res)
			throws InterruptedException{
		Optional<Reservation>reservationItem=repo.findById(id);
		if(reservationItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
		Reservation reservationToSave = reservationItem.get();
		reservationToSave.setMemberName(reservation.getMemberName());
		reservationToSave.setMemberPhone(reservation.getMemberPhone());
		reservationToSave.setMemberRequest(reservation.getMemberRequest());
		reservationToSave.setGymName(reservation.getGymName());
		reservationToSave.setTrainerName(reservation.getTrainerName());
		reservationToSave.setBoughtService(reservation.getBoughtService());
		
		Reservation reservationSave = repo.save(reservationToSave);
		return reservationSave;
	}
		
	
	
}
