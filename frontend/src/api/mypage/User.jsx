import { baseAxios } from "../Api";

export async function Signup(props) {
  try {
    const curStatus = props.my_data ? "1" : "0";
    const res = await baseAxios.post(`user/signup/${curStatus}`, {
      name: props.name,
      email: props.email,
      password: props.password,
      residence_info: props.residence_info,
      region_key: props.region_key,
      end_date: props.end_date,
      is_ended: props.is_ended,
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
