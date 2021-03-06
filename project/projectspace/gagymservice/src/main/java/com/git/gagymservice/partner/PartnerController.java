package com.git.gagymservice.partner;
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
public class PartnerController {
	private PartnerService service;
	private PartnerRepository repo;
	
	@Autowired
	public PartnerController(PartnerRepository repo , PartnerService service)
	{
		this.service = service;
		this.repo=repo;
	}
	
	@GetMapping(value="/partner")
	public List<Partner> getPartner() throws InterruptedException{
		return repo.findAll(Sort.by("id").descending());
	}
	@PostMapping(value = "/partner")
	public Partner addPartner(@RequestBody Partner partner, HttpServletResponse res) throws InterruptedException{
//		if(TextProcesser.isEmpyText(partner.getGymName())) {
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//			return null;
//		}
		Partner partnerItem = Partner.builder()
				.gymName(partner.getGymName()).gymCoNum(partner.getGymCoNum()).gymLocateSi(partner.getGymLocateSi())
				.gymLocateGunGu(partner.getGymLocateGunGu()).gymAddress(partner.getGymAddress()).gymPhoneNum(partner.getGymPhoneNum())
				.gymTime(partner.getGymTime()).gymService(partner.getGymService())
				.gymPhoto(partner.getGymPhoto())
				.fileType(partner.getFileType())
				.fileName(partner.getFileName())
				.gym1DayPrice(partner.getGym1DayPrice())
				.gym3DayPrice(partner.getGym3DayPrice()).gym7DayPrice(partner.getGym7DayPrice())
				.gym3MonthPrice(partner.getGymMonthPrice()).gym3MonthPrice(partner.getGym3MonthPrice()).gym6MonthPrice(partner.getGym6MonthPrice())
				.gymYearPrice(partner.getGymYearPrice())
				.build();
		
		Partner partnerSaved = repo.save(partnerItem);
		res.setStatus(HttpServletResponse.SC_CREATED);
		service.sendPartner(partner);
		return partnerSaved;
				
	}
	
//	@GetMapping(value="partner/{id}")
//	public Partner insertTrainer(@PathVariable long id, @RequestBody Partner partner,@RequestBody Trainer trainer, HttpServletResponse res)
//			throws InterruptedException{
//				Optional<Partner> partnerItem = repo.findById(id);
//				Optional<Trainer> trainerItem = repo.findByGymCode(gymCode);
//				
//				Trainer trainerToSave = trainerItem.get();
//				trainerToSave.setGymCode(trainer.getGymCode());
//				trainerToSave.setTrainerName(trainer.getTrainerName());
//				trainerToSave.setTrainerIntro(trainer.getTrainerIntro()); 
//				trainerToSave.setTrainerPhotoUrl(trainer.getTrainerPhotoUrl());
//				trainerToSave.setPt1TimePrice(trainer.getPilates1TimePrice());
//				trainerToSave.setPt10TimePrice(trainer.getPilates10TimePrice());
//				trainerToSave.setPt30TimePrice(trainer.getPilates30TimePrice());
//				trainerToSave.setYoga1TimePrice(trainer.getYoga1TimePrice());
//				trainerToSave.setYoga10TimePrice(trainer.getYoga10TimePrice());
//				trainerToSave.setYoga30TimePrice(trainer.getYoga30TimePrice());
//				trainerToSave.setPilates1TimePrice(trainer.getPilates1TimePrice());
//				trainerToSave.setPilates10TimePrice(trainer.getPilates10TimePrice());
//				trainerToSave.setPilates30TimePrice(trainer.getPilates30TimePrice());
//				
//				
//				Partner = partnerItem.get();
//				return Partner;
//				}
	@DeleteMapping(value = "/partner/{id}")
	public boolean removePartner(@PathVariable long id, HttpServletResponse res) throws InterruptedException{
		Optional<Partner> partner = repo.findById(id);
		if (partner.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		repo.deleteById(id);
		return true;
	}
	
	@PutMapping(value = "/partner/{id}")
	public Partner modifyPartner(@PathVariable long id, @RequestBody Partner partner, HttpServletResponse res)
	throws InterruptedException{
		Optional<Partner> partnerItem = repo.findById(id);
		if(partnerItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
		
		Partner partnerToSave = partnerItem.get();
		partnerToSave.setGymName(partner.getGymName());
		partnerToSave.setGymCoNum(partner.getGymCoNum());
		partnerToSave.setGymLocateSi(partner.getGymLocateSi());
		partnerToSave.setGymLocateGunGu((partner.getGymLocateGunGu()));
		partnerToSave.setGymAddress(partner.getGymAddress());
		partnerToSave.setGymPhoneNum(partner.getGymPhoneNum());
		partnerToSave.setGymTime(partner.getGymTime());
		partnerToSave.setGymService(partner.getGymService());
		partnerToSave.setGymPhoto(partner.getGymPhoto());
		partnerToSave.setFileName(partner.getFileName());
		partnerToSave.setFileType(partner.getFileType());
		partnerToSave.setGym1DayPrice(partner.getGym1DayPrice());
		partnerToSave.setGym3DayPrice(partner.getGym3DayPrice());
		partnerToSave.setGym7DayPrice(partner.getGym7DayPrice());
		partnerToSave.setGymMonthPrice(partner.getGymMonthPrice());
		partnerToSave.setGym3MonthPrice(partner.getGym3MonthPrice());
		partnerToSave.setGym6MonthPrice(partner.getGym6MonthPrice());
		partnerToSave.setGymYearPrice(partner.getGymYearPrice());
		
		Partner partnerSaved = repo.save(partnerToSave);
		service.sendPartner(partner);
		return partnerSaved;
		
		}
	}
