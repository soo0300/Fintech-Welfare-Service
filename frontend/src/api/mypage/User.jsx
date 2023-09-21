import { baseAxios } from "../Api";

export async function Signup(props) {
  try {
    const curStatus = props.my_data ? "1" : "0";
    const res = await baseAxios.post(`user/signup/${curStatus}`, {
      name: props.name,
      email: props.email,
      password: props.password,
      residenceInfo: props.residence_info,
      regionKey: props.region_key,
      endDate: props.end_date,
      isEnded: props.is_ended,
      createdDate: props.createdDate,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function Login(props) {
  try {
    const res = await baseAxios.post("user/login", {
      email: props.email,
      password: props.password,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}
