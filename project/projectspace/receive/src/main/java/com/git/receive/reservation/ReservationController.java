package com.git.receive.reservation;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RestController
public class ReservationController {
	private ReservationRepository repo;
	
	@Autowired
	public ReservationController(ReservationRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping(value = "/reservation")
	public List<Reservation>getReservation() throws InterruptedException{
		return repo.findAll(Sort.by("id").descending());
	}
	
}
