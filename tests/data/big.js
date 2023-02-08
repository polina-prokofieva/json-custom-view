export const dataExample = `{
  "@active": "yes",
  "@status": "new",
  "@dtversion": "2.0",
  "key_data": {
    "@optout": "no",
    "dt_lender_id": "CMB",
    "dt_dealer_id": "104334",
    "dt_app_id": "1070003779",
    "lender_dealer_id": "1767324566",
    "lender_app_id": [],
    "requestdate": "2001-02-14T16:37:39",
    "credit_type": {
      "@type": "joint"
    },
    "app_type": {
      "@type": "personal"
    },
    "product_type": {
      "@type": "retail",
      "@paymentcall": "no"
    },
    "vehicle_type": {
      "@type": "new",
      "@trade": "no"
    },
    "cust_credit_type": {
      "@type": "none"
    },
    "loan_type": {
      "@type": "auto"
    },
    "source": [],
    "user_name": "John Smith",
    "spot": {
      "@indicator": "yes"
    }
  },
  "application_data": {
    "@type": "newapplication",
    "@regb": "yes",
    "@comu_state": "no",
    "@swap": "no",
    "@cosigner_intent": "no",
    "@program_routing_ind": "pass",
    "applicant_data": [
      {
        "@type": "primary",
        "first_name": "JOHN",
        "mi": "Middle",
        "last_name": "DOE",
        "suffix": "SR",
        "ssn": "745345435",
        "dob": "1950-12-12",
        "address": [
          {
            "@type": "current",
            "street_no": "234",
            "street_name": "STEWART",
            "street_type": "RD",
            "street_type_desc": "ROAD",
            "apt_no": "669",
            "po_box_no": "1033",
            "roural_route": "RR9",
            "city": "GARDEN CITY",
            "state": "NY",
            "zip_code": "11552",
            "address_line_1": "1111 Marcus Ave"
          },
          {
            "@type": "previous",
            "street_no": "105",
            "street_name": "MAXESS",
            "street_type": "RD",
            "apt_no": "109",
            "po_box_no": [],
            "roural_route": [],
            "city": "MELVILLE",
            "state": "NY",
            "zip_code": "11747",
            "address_line_1": "64 Abbey Road London"
          }
        ],
        "home_phone_no": "5167453455",
        "years_at_address": "4",
        "months_at_address": "2",
        "years_at_prv_address": "8",
        "months_at_prv_address": "6",
        "email_address": "catchyourcar@dealertrack.com",
        "housing_status": {
          "@type": "rent"
        },
        "mortgage_rent": "1000",
        "employment_data": {
          "@type": "current",
          "emp_status": {
            "@type": "employed"
          },
          "employed_by": "CHASE",
          "work_phone_no": "5162131243",
          "years_employed": "3",
          "months_employed": "2",
          "occupation": "MANAGER",
          "salary": {
            "@type": "annual",
            "#text": "70000"
          }
        },
        "other_income": "2000",
        "source_other_income": "BUSINESS",
        "comments": "This is a test",
        "marital_status": "separated",
        "driver_license_no": "413872124",
        "driver_license_state": "NY",
        "other_phone_no": "7134390439",
        "spouse_first_name": "JOHN",
        "spouse_mi": "WINSTON",
        "spouse_last_name": "LENNON",
        "spouse_salary": "other",
        "spouse_other_income": "20000",
        "spouse_source_other_income": "Royalty",
        "spouse_address": "434 East 52nd Street NY"
      },
      {
        "@type": "coapplicant",
        "first_name": "JOHN",
        "mi": [],
        "last_name": "WAYNE",
        "ssn": "222212111",
        "dob": "1975-01-01",
        "address": {
          "@type": "current",
          "street_no": "2",
          "street_name": "BRIDGE",
          "street_type": "RD",
          "street_type_desc": "ROAD",
          "city": "EASTMEADOW",
          "state": "NY",
          "zip_code": "11554",
          "address_line_1": "1111 Marcus Ave"
        },
        "home_phone_no": "5166666666",
        "years_at_address": "3",
        "months_at_address": "1",
        "housing_status": {
          "@type": "own_outright"
        },
        "mortgage_rent": "0",
        "employment_data": {
          "@type": "current",
          "emp_status": {
            "@type": "employed"
          },
          "employed_by": "B&N",
          "work_phone_no": "5166666666",
          "years_employed": "2",
          "months_employed": "2",
          "occupation": "SECURITY",
          "salary": {
            "@type": "monthly",
            "#text": "2000"
          }
        },
        "comments": "Hi ! i can guarantee you that everything will be ok."
      },
      {
        "@type": "coapplicant",
        "first_name": "DAVID",
        "mi": "R",
        "last_name": "HUNTER",
        "ssn": "235869645",
        "dob": "1970-11-20",
        "address": {
          "@type": "current",
          "street_no": "1201",
          "street_name": "EAST ROAD",
          "city": "PLANO",
          "state": "TX",
          "zip_code": "75243"
        },
        "home_phone_no": "9728815454",
        "years_at_address": "3",
        "months_at_address": "1",
        "housing_status": {
          "@type": "other"
        },
        "employment_data": {
          "@type": "current",
          "emp_status": {
            "@type": "employed"
          },
          "employed_by": "GFHJFSA",
          "years_employed": "3",
          "months_employed": "0",
          "salary": {
            "@type": "monthly",
            "#text": "3250.00"
          }
        },
        "relationship": {
          "@type": "other"
        }
      },
      {
        "@type": "coapplicant",
        "first_name": "JANE",
        "mi": [],
        "last_name": "DOE",
        "ssn": "745345435",
        "dob": "1956-12-12",
        "address": {
          "@type": "current",
          "street_no": "234",
          "street_name": "STEWART",
          "street_type": "RD",
          "street_type_desc": "ROAD",
          "city": "GARDEN CITY",
          "state": "NY",
          "zip_code": "11552",
          "address_line_1": "1111 Marcus Ave"
        },
        "home_phone_no": "5167453455",
        "years_at_address": "4",
        "housing_status": {
          "@type": "military"
        },
        "mortgage_rent": "1000",
        "employment_data": {
          "@type": "current",
          "emp_status": {
            "@type": "employed"
          },
          "employed_by": "CHASE",
          "work_phone_no": "5162138765",
          "years_employed": "3",
          "occupation": "DEVELOPER",
          "salary": {
            "@type": "annual",
            "#text": "50000"
          }
        },
        "relationship": {
          "@type": "spouse"
        }
      }
    ],
    "vehicle_data": {
      "certified_used": "Y",
      "stock_no": "87618746",
      "vin": "2HE2323L232333217",
      "book_year": "1997",
      "book_make": "ACURA",
      "model": "CL",
      "trim": "2D CPE 3.2L",
      "trade_year": "1970",
      "trade_make": "TOYOTA",
      "trade_model": "CAMRY",
      "trade_trim": "4D SDN XLE",
      "trade_financed": "ABC Bank",
      "trade_monthly_payment": "200",
      "trade_other_year": [],
      "trade_other_make": [],
      "trade_other_model": [],
      "trade_other_trim": [],
      "other_year": "2014",
      "other_make": "ACURA",
      "other_model": "ILX",
      "other_trim": "4DR SDN 1.5L HYBRID",
      "chrome_style_id": "360730",
      "chrome_year": "2014",
      "chrome_make": "ACURA",
      "chrome_model": "ILX",
      "chrome_trim": "4DR SDN 1.5L HYBRID",
      "lbo_bookout": [
        {
          "@source": "black",
          "lbo_bookout_date": "2009-01-14",
          "lbo_book_period": "01-09",
          "lbo_book_region": "California",
          "lbo_book_values": {
            "@value_type": "retail",
            "@condition": "clean"
          },
          "lbo_base_value": "8750",
          "lbo_mileage_adj": "575",
          "lbo_total_value_options": "0",
          "lbo_options": [
            {
              "@name": "w/o Running Boards",
              "@code": "137",
              "#text": "-175"
            },
            {
              "@name": "Leather Seats",
              "@code": "076",
              "#text": "175"
            },
            {
              "@name": "Luggage Rack",
              "@code": "043",
              "#text": "0"
            }
          ],
          "lbo_book_value": "9325"
        },
        {
          "@source": "nada",
          "lbo_bookout_date": "2009-01-14",
          "lbo_book_period": "01-09",
          "lbo_book_region": "California",
          "lbo_book_values": {
            "@value_type": "loan",
            "@condition": "na"
          },
          "lbo_base_value": "6650",
          "lbo_mileage_adj": "3687.5",
          "lbo_total_value_options": "975",
          "lbo_options": [
            {
              "@name": "Running Boards",
              "@code": "137",
              "#text": "1000"
            },
            {
              "@name": "w/o Leather Seats",
              "@code": "076",
              "#text": "-25"
            },
            {
              "@name": "Luggage Rack",
              "@code": "043",
              "#text": "0"
            }
          ],
          "lbo_book_value": "11312.5"
        }
      ]
    },
    "product_data": {
      "term_months": "36",
      "cash_selling_price": "22000",
      "ttl_estimate": "150",
      "cash_down": "1500",
      "rebate": "500",
      "unpaid_balance": "20300",
      "warranty": "200",
      "creditlife": "250",
      "acc_health_insurance": "200",
      "est_amt_financed": "21000",
      "invoice_amount": "23000",
      "est_payment": "500",
      "sales_tax": "100",
      "other_finance_fees": "50",
      "gap": [],
      "other_fees": "50",
      "app_opt_program": {
        "@id": "RNJ1",
        "#text": "Retail New Program no Bureau"
      },
      "drs_tags": {
        "customtag1": {
          "@name": "OTDXDCMB01",
          "#text": "M0331"
        },
        "customtag2": {
          "@name": "OTDXDCMB02",
          "#text": "M0332"
        },
        "customtag3": {
          "@name": "OTDXDCMB03",
          "#text": "M0333"
        },
        "customtag4": {
          "@name": "OTDXDCMB04",
          "#text": "M0334"
        }
      }
    },
    "additional_data": []
  }
}`;
