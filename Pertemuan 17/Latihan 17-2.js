function buatSegitiga() {
    const n = 10; // tinggi default
    let output = "";

    for (let i = 1; i <= n; i++) {
        // spasi kiri
        for (let s = 1; s <= n - i; s++) {
            output += " ";
        }
        // bintang
        for (let b = 1; b <= (2 * i - 1); b++) {
            output += "*";
        }
        output += "\n";
    }

    console.log(output);
}

// panggil fungsi langsung
buatSegitiga();
