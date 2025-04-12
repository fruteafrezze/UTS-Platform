// Function untuk menangani error biar nggak crash
function handleError(callback) {
    try {
        callback();
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Validasi Nama (tidak boleh kosong atau mengandung angka)
function validateNama(nama) {
    if (nama.trim() === "") throw new Error("Nama tidak boleh kosong!");
    if (/\d/.test(nama)) throw new Error("Nama tidak boleh mengandung angka!");
}

// ✅ Validasi Email (harus mengandung '@')
function validateEmail(email) {
    if (email.trim() === "") throw new Error("Email tidak boleh kosong!");
    if (!email.includes("@")) throw new Error("Email harus mengandung '@'!");
}

// Validasi Jumlah Pilihan (harus angka positif)
function validateJumlah(jumlah) {
    let num = parseInt(jumlah, 10);
    if (isNaN(num) || num <= 0) throw new Error("Jumlah harus berupa angka positif!");
    return num;
}

// Validasi setiap Pilihan (tidak boleh kosong atau berupa angka)
function validatePilihan(pilihan) {
    if (pilihan.trim() === "") throw new Error("Semua pilihan harus diisi!");
    if (!isNaN(pilihan)) throw new Error("Pilihan tidak boleh berupa angka!");
}

// Function utama untuk menampilkan input pilihan
function showPilihan() {
    handleError(() => {
        let namaInput = document.getElementById("nama");
        let emailInput = document.getElementById("email"); // ✅ Ambil input email
        let jumlahInput = document.getElementById("jumlah");
        let submitButton = document.getElementById("submitButton");
        let pilihanContainer = document.getElementById("pilihan-container");

        let nama = namaInput.value.trim();
        let email = emailInput.value.trim(); // ✅ Ambil nilai email
        let jumlah = jumlahInput.value.trim();

        validateNama(nama);
        validateEmail(email); // ✅ Validasi email
        jumlah = validateJumlah(jumlah);

        // Kunci input setelah submit
        namaInput.disabled = true;
        emailInput.disabled = true; // ✅ Kunci email juga
        jumlahInput.disabled = true;
        submitButton.disabled = true;

        pilihanContainer.innerHTML = "<legend>Masukkan Pilihan</legend>";

        for (let i = 1; i <= jumlah; i++) {
            let label = document.createElement("label");
            label.innerText = "Pilihan " + i + ":";

            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Teks Pilihan " + i;
            input.id = "pilihan" + i;

            pilihanContainer.appendChild(label);
            pilihanContainer.appendChild(input);
        }

        let button = document.createElement("button");
        button.innerText = "OK";
        button.onclick = () => handleSelection(jumlah);
        pilihanContainer.appendChild(button);
    });
}

// Function untuk menangani pilihan dan mengunci input pilihan
function handleSelection(jumlah) {
    handleError(() => {
        for (let i = 1; i <= jumlah; i++) {
            let inputPilihan = document.getElementById("pilihan" + i);
            validatePilihan(inputPilihan.value);
            inputPilihan.disabled = true; // Kunci input setelah "OK" ditekan
        }

        showSelection(jumlah);
    });
}

// Function untuk menampilkan dropdown pilihan
function showSelection(jumlah) {
    let selectionContainer = document.getElementById("selection-container");
    selectionContainer.innerHTML = "<legend>Pilih Salah Satu</legend>";

    let select = document.createElement("select");
    select.id = "selectedOption";

    for (let i = 1; i <= jumlah; i++) {
        let pilihan = document.getElementById("pilihan" + i).value;

        let option = document.createElement("option");
        option.value = pilihan;
        option.innerText = pilihan;
        select.appendChild(option);
    }

    selectionContainer.appendChild(select);

    let button = document.createElement("button");
    button.innerText = "OK";
    button.onclick = showFinalResult;    
    selectionContainer.appendChild(document.createElement("br"));
    selectionContainer.appendChild(button);
}

// Function untuk menampilkan hasil akhir
function showFinalResult() {
    handleError(() => {
        let nama = document.getElementById("nama").value.trim();
        let email = document.getElementById("email").value.trim(); // ✅ Ambil email
        let jumlah = parseInt(document.getElementById("jumlah").value, 10);
        let selected = document.getElementById("selectedOption").value;
        let hasil = `Halo, nama saya ${nama}, dengan email ${email}, saya memiliki ${jumlah} pilihan yaitu `;

        let pilihanList = [];
        for (let i = 1; i <= jumlah; i++) {
            pilihanList.push(document.getElementById("pilihan" + i).value);
        }

        hasil += pilihanList.join(", ") + `, dan saya memilih ${selected}.`;
        document.getElementById("result").innerText = hasil;
    });
}
