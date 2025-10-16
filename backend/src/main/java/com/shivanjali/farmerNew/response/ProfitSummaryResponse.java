// ProfitSummaryResponse.java
package com.uday.farmerNew.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfitSummaryResponse {
    private String farmerName;
    private Long farmerId;
    private double totalRevenue;     // Amount customer paid
    private double farmerEarnings;   // Actual revenue farmer gets
    private double adminProfit;      // Admin profit from that farmer
}
