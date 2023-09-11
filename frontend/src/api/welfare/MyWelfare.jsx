import { baseAxios } from "../Api";

export async function GetExamine(props) {
  try {
    const res = await baseAxios.get(`benefit/examine/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function PostExamine(props) {
  try {
    const res = await baseAxios.post(
      `benefit/examine/register/${props.user_id}`,
      {
        welfare_id: props.welfare_id,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function GetReceive(props) {
  try {
    const res = await baseAxios.get(`benefit/receive/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function PostReceive(props) {
  try {
    const res = await baseAxios.post(
      `benefit/receive/register/${props.user_id}`,
      {
        welfare_id: props.welfare_id,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function GetMywelfare(props) {
  try {
    const res = await baseAxios.post(`benefit/user_info/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}
