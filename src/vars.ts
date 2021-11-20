export const vars = {
    API_BASE: "http://tikkit.local.com",
    STATUS: {
      BAD_REQUEST: 400,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      NOT_FOUND: 404,
      NOTACCEPTABLE: 406,
      NOT_MODIFIED: 304,
      SUCCESS: 200,
      UNAUTHORIZED: 401,
      UNPROCESSABLE_ENTITY: 422,
    },
    METHODS: {
      DELETE: "DELETE",
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
    },
    DB: {
      LIMIT: 20,
      SORT: {
        ASC: "asc",
        DESC: "desc",
      },
    },
    RESPONSE: {
      FAILED: "Failed",
      IS_ARRAY: "Response structure seems to be an array,expect object",
      SUCCESS: "Success",
      STATUS: {
        FAILED: false,
        SUCCESS: true,
      },
    },
    MESSAGES: {
      PAYLOAD_FIELD_MISSING:
        "Required payload field #FIELD# was missing.",
      DATA_FIELD_MISSING:
        "Required data field #FIELD# was missing.",
      DATA_FIELD_BLANK:
        "Required data field #FIELD# can't be blank.",
      INVALID_TOKEN_EXPIRED: "Invalid or expired token",
      DATA_MISSING: "Missing data",
      DB_ERROR: "Some database error occurred!",
      INTERNAL_SERVER_ERROR: "Internal server error",
    },
    USERINFORMATION: {
        MESSAGES: {
            EMAIL_EXIST: "Sorry, Email has already been used",
            SUCCESS: "success",
            GET_ALL_DATA: "User information listed successfully",
            GET_SINGLE_DATA: "User information details listed successfully",
            PHONE_VALIDATE: "Sorry, Phone number is not a valid 10 digit number!",
        }

    },
  };
  