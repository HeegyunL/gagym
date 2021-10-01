package com.git.controller.Contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
	private long id;
	private String name;
	private String phone;
	private String mail;
	private String memo;
	private long createdTime;
}