import { gql } from "@apollo/client";

export const GetCustomerByIdQuery = gql`
  query GetCustomerById($id: ID!) {
    customer(id: $id) {
      first_name
      last_name
      customer_ref_code
      telephone_no
      date_of_birth
      commonAddress {
        building_no
        street
        city
        postal_code
      }
      identification {
        identification_no
        identificationType {
          name
        }
      }
    }
  }
`;
