export async function submitRecord(record) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const txHash = "0x" + Math.random().toString(16).slice(2, 66);
      resolve({
        ok: true,
        data: { record, blockchainTx: txHash, createdAt: new Date().toISOString() },
      });
    }, 800);
  });
}

export async function verifyPermit(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        data: { id, status: "valid", verifiedAt: new Date().toISOString() },
      });
    }, 600);
  });
}
