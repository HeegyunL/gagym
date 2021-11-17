package com.git.partnerMq.partner;

import com.git.partnerMq.Result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerCreateResponse {
	private Partner partner;
//	private Result result;
}
