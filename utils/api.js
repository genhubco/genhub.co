function error_obj({ kind, pos = [0, 0] }) {
  let msg = `${kind}: ${pos}`;
  return {
    error: true,
    kind,
    message: msg,
    pos,
  };
}

async function compileEmergence(text) {
  const res = await fetch(
    "https://emergence-glqm1788p.vercel.app/api/compile.rs",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: text,
    }
  );
  return res;
}

async function compile(text) {
  try {
    let res = await compileEmergence(text);
    if (res.status === 500) {
      let error = error_obj({ kind: "Unknown" });
      return error;
    } else if (res.status === 400) {
      const error = await res.json();
      return error_obj(error);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    return error_obj({ kind: "Unknown" });
  }
}

export { compile };
