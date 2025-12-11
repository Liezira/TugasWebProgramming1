function buatBelahKetupat() {
  const n = 10; // tinggi setengah belah ketupat
  let output = "";

  // Bagian atas (segitiga naik)
  for (let i = 1; i <= n; i++) {
    for (let s = 1; s <= n - i; s++) {
      output += " ";
    }
    for (let b = 1; b <= 2 * i - 1; b++) {
      output += "*";
    }
    output += "\n";
  }

  // Bagian bawah (segitiga terbalik)
  for (let i = n - 1; i >= 1; i--) {
    for (let s = 1; s <= n - i; s++) {
      output += " ";
    }
    for (let b = 1; b <= 2 * i - 1; b++) {
      output += "*";
    }
    output += "\n";
  }

  console.log(output);
}

// panggil fungsi
buatBelahKetupat();
