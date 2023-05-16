interface loginResponse {
  token: string;
  user: user;
}
const url = "https://warehousebackend-production-d411.up.railway.app";
export interface user {
  id: number;
  name: string;
  admin: boolean;
}

export interface work {
  id: number;
  work_type: string;
  start_timestamp: string;
  end_timestamp: string;
  worker_id: number;
}

export async function loginWorker(
  name: string,
  password: string
): Promise<loginResponse> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  };
  const result = await fetch(`${url}/worker/login`, options);
  return result.json();
}

export async function getWorkers(): Promise<user[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };

  const result = await fetch(`${url}/worker`, options);
  return result.json();
}

export async function addWorker(name: string, password: string) {
  const token = localStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ name, password }),
  };
  const result = await fetch(`${url}/worker`, options);
  return result.json();
}

export async function getWorks(): Promise<work[]> {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!);
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/${user.id}`, options);
  return result.json();
}

export async function getWorkTypes(): Promise<string[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/work`, options);
  return result.json();
}

export async function createWork(workType: string): Promise<work> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify({
      workType: workType,
    }),
  };
  console.log(options);
  const result = await fetch(`${url}/picking`, options);
  return result.json();
}

export async function getLatestWork(): Promise<work[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/latest`, options);
  return result.json();
}

export async function updateWork(work: work) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "PUT",
    body: JSON.stringify(work),
  };
  const result = await fetch(`${url}/picking/` + work.id, options);
  return result.json();
}
