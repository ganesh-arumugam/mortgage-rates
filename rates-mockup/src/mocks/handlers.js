// src/mocks/handlers.js
import { rest } from "msw";
import { setupServer } from "msw/node";

const url =
  "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?loanSize=300000&creditScore=705&propertyType=Condo&occupancy=Secondary";
export const server = setupServer(
  // Handles a GET /quotes request
  rest.get(url, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        rateQuotes: [
          {
            lenderName: "TFB Federal Credit Union",
            loanType: "7/1 ARM",
            interestRate: 3.625,
            closingCosts: 1249.9,
            monthlyPayment: -0.045605130202217986,
            apr: 10.874999999999996,
          },
          {
            lenderName: "TFB Federal Credit Union",
            loanType: "10/1 ARM",
            interestRate: 3.75,
            closingCosts: 1249.9,
            monthlyPayment: -0.046311559157212426,
            apr: 11.25,
          },
          {
            lenderName: "TFB Federal Credit Union",
            loanType: "30YR Fixed",
            interestRate: 4,
            closingCosts: 1249.9,
            monthlyPayment: -0.04774152954654538,
            apr: 11.999999999999998,
          },
          {
            lenderName: "Bates College Credit Union",
            loanType: "7/1 ARM",
            interestRate: 3.25,
            closingCosts: 2149.9925000000003,
            monthlyPayment: -0.04352063190723826,
            apr: 9.749999999999998,
          },
          {
            lenderName: "Bates College Credit Union",
            loanType: "10/1 ARM",
            interestRate: 3.375,
            closingCosts: 2149.9925000000003,
            monthlyPayment: -0.04420962102674966,
            apr: 10.124999999999998,
          },
          {
            lenderName: "Bates College Credit Union",
            loanType: "20YR Fixed",
            interestRate: 3.25,
            closingCosts: 2149.9925000000003,
            monthlyPayment: -0.04352063190723826,
            apr: 9.749999999999998,
          },
          {
            lenderName: "Bates College Credit Union",
            loanType: "30YR Fixed",
            interestRate: 3.625,
            closingCosts: 2149.9925000000003,
            monthlyPayment: -0.045605130202217986,
            apr: 10.874999999999996,
          },
          {
            lenderName: "Tres Graduado Mortgage",
            loanType: "15YR Fixed",
            interestRate: 3.5,
            closingCosts: 1199.875,
            monthlyPayment: -0.044904468780882355,
            apr: 10.499999999999998,
          },
          {
            lenderName: "Tres Graduado Mortgage",
            loanType: "20YR Fixed",
            interestRate: 3.625,
            closingCosts: 1199.875,
            monthlyPayment: -0.045605130202217986,
            apr: 10.874999999999996,
          },
          {
            lenderName: "Tres Graduado Mortgage",
            loanType: "30YR Fixed",
            interestRate: 3.75,
            closingCosts: 1199.875,
            monthlyPayment: -0.046311559157212426,
            apr: 11.25,
          },
          {
            lenderName: "Online National Financial Institution",
            loanType: "10/1 ARM",
            interestRate: 2.75,
            closingCosts: 649.75,
            monthlyPayment: -0.040824118099885315,
            apr: 8.25,
          },
          {
            lenderName: "Online National Financial Institution",
            loanType: "20YR Fixed",
            interestRate: 2.75,
            closingCosts: 649.75,
            monthlyPayment: -0.040824118099885315,
            apr: 8.25,
          },
          {
            lenderName: "Online National Financial Institution",
            loanType: "30YR Fixed",
            interestRate: 2.875,
            closingCosts: 649.75,
            monthlyPayment: -0.04148924770760961,
            apr: 8.625,
          },
        ],
      })
    );
  })
);
