package com.git.gagymservice.diary;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class DiaryService {
	private RabbitTemplate rabbit;
	DiaryRepository repo;
	
	
	public DiaryService(DiaryRepository repo, RabbitTemplate rabbit) {
		this.repo = repo;
		this.rabbit = rabbit;
	}
	
	//queue로 데이터 보내기
	public void sendDiary(Diary diary) {
		System.out.println(diary);
		rabbit.convertAndSend("service.diary.feedback", diary);
	}
// queue로부터 데이터 받기  
	@RabbitListener(queues="service.diary.create")
	public void receiveDiary(Diary diary){
		saveDiary(diary); 
		System.out.println("-- service.diary.create --");
		System.out.println(diary);
	}
	
	public Diary saveDiary(Diary diary) {
		Diary saveDiary = Diary.builder()
				.memberName(diary.getMemberName())
				.diaryMorning(diary.getDiaryMorning())
				.diaryLunch(diary.getDiaryLunch())
				.diaryDinner(diary.getDiaryDinner())
				.diaryRoutine(diary.getDiaryRoutine())
				.diaryRequest(diary.getDiaryRequest())
				.trainerName(diary.getTrainerName())
				.trainerFeedback(diary.getTrainerFeedback())
				.build();
		repo.save(saveDiary);
		return saveDiary;
	}

	
}
