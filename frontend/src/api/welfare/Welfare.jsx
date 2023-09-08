import { baseAxios } from "../Api";

export async function AllWelfare() {
  try {
    const res = await baseAxios.get(`welfare/all`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function DetailWelfare(props) {
  try {
    const res = await baseAxios.get(`welfare/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function SearchWelfare(props) {
  try {
    const res = await baseAxios.get(`welfare/search?query=${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function ChangeRegion(props) {
  try {
    const res = await baseAxios.get(`welfare/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}
