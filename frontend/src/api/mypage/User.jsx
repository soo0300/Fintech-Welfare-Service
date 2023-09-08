import { baseAxios } from "../Api";

export async function Signup(props) {
  const date = new Date().toISOString().slice(0, -5).replace("T", " ");
  try {
    const res = await baseAxios.post("user/signup", {
      name: props.name,
      email: props.email,
      password: props.password,
      residence_info: props.residence_info,
      end_date: props.end_date,
      is_ended: props.is_ended,
      created_date: date,
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
