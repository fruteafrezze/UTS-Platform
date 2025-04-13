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

// Validasi Email (harus mengandung '@')
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
        let namaDepanInput = document.getElementById("namaDepan");
        let namaBelakangInput = document.getElementById("namaBelakang");
        let emailInput = document.getElementById("email"); 
        let jumlahInput = document.getElementById("jumlah");
        let submitButton = document.getElementById("submitButton");
        let pilihanContainer = document.getElementById("pilihan-container");

        let namaDepan = namaDepanInput.value.trim();
        let namaBelakang = namaBelakangInput.value.trim();
        let email = emailInput.value.trim(); 
        let jumlah = jumlahInput.value.trim();

        validateNama(namaDepan);
        validateNama(namaBelakang);
        validateEmail(email); 
        jumlah = validateJumlah(jumlah);
        let namaLengkap = namaDepan + " " + namaBelakang;

        // Kunci input setelah submit
        namaDepan.disabled = true;
        namaBelakang.disabled = true;
        emailInput.disabled = true; 
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
    selectionContainer.innerHTML = "<legend>Pilih Hobi yang Kamu Sukai</legend>";

    let select = document.createElement("select");
    select.id = "selectedHobi";
    select.className = "form-select mb-3";

    for (let i = 1; i <= jumlah; i++) {
        let nilai = document.getElementById("pilihan" + i).value;

        let option = document.createElement("option");
        option.value = nilai;
        option.textContent = nilai;
        select.appendChild(option);
    }

    selectionContainer.appendChild(select);

    let button = document.createElement("button");
    button.textContent = "OK";
    button.className = "btn btn-info";
    button.onclick = showFinalResult;

    selectionContainer.appendChild(button);
}



// Function untuk menampilkan hasil akhir
function showFinalResult() {
    handleError(() => {
        let namaDepan = document.getElementById("namaDepan").value.trim();
        let namaBelakang = document.getElementById("namaBelakang").value.trim();
        let email = document.getElementById("email").value.trim();
        let jumlah = parseInt(document.getElementById("jumlah").value, 10);

        let semuaHobi = [];
        for (let i = 1; i <= jumlah; i++) {
            semuaHobi.push(document.getElementById("pilihan" + i).value);
        }

        let hobiFavorit = document.getElementById("selectedHobi").value;

        let hasil = `Hallo, nama saya ${namaDepan} ${namaBelakang}, dengan email ${email}, saya mempunyai sejumlah ${jumlah} pilihan hobi yaitu ${semuaHobi.join(", ")}, dan saya paling menyukai ${hobiFavorit}.`;

        document.getElementById("result").innerText = hasil;
    });
}
