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
	private PartnerRepository repo;
	
	@Autowired
	public PartnerController(PartnerRepository repo)
	{
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
				.gymTime(partner.getGymTime()).gymService(partner.getGymService()).gym1DayPrice(partner.getGym1DayPrice())
				.gym3DayPrice(partner.getGym3DayPrice()).gym7DayPrice(partner.getGym7DayPrice())
				.gym3MonthPrice(partner.getGymMonthPrice()).gym3MonthPrice(partner.getGym3MonthPrice()).gym6MonthPrice(partner.getGym6MonthPrice())
				.gymYearPrice(partner.getGymYearPrice())
				.build();
		
		Partner partnerSaved = repo.save(partnerItem);
		res.setStatus(HttpServletResponse.SC_CREATED);
		return partnerSaved;
				
	}
	@DeleteMapping(value = "/partner")
	public boolean removePartner(@PathVariable long id, HttpServletResponse res) throws InterruptedException{
		Optional<Partner> partner = repo.findById(id);
		if (partner.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		repo.deleteById(id);
		return true;
	}
	
	@PutMapping(value = "/partner/")
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
		partnerToSave.setGym1DayPrice(partner.getGym1DayPrice());
		partnerToSave.setGym3DayPrice(partner.getGym3DayPrice());
		partnerToSave.setGym7DayPrice(partner.getGym7DayPrice());
		partnerToSave.setGymMonthPrice(partner.getGymMonthPrice());
		partnerToSave.setGym3MonthPrice(partner.getGym3MonthPrice());
		partnerToSave.setGym6MonthPrice(partner.getGym6MonthPrice());
		partnerToSave.setGymYearPrice(partner.getGymYearPrice());
		
		Partner partnerSaved = repo.save(partnerToSave);
		return partnerSaved;
		
		}
	}
