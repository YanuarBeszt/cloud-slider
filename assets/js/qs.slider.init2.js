/*! Cloud Pricing Slider | (c) 1014 QsThemes.com
// Licensed Under codecanyon license aggrement. // http://codecanyon.net/licensess
*/

$(document).ready(function () {
  //aktifkan slider
  $("#qsSlider").qsSlider({
    // Harga
    PriceBase: "0", // Harga total seluruh item HDD 20GB
    PriceCPU: "130.000", // per bulan per unit
    PriceRAM: "110.000", // per bulan per 1024 MB
    PriceHDD: "0.9", // per bulan per 10 GB
    PriceIP: "35000", // per bulan per unit

    // Nilai Maksimum slider
    MaxCPU: "32", // Maksimum CPU
    MaxRAM: "123", // Maksimum RAM // Harus + 2 jika ingin maksimum RAM 16 GB maka setting jadi 18 dst..
    MaxHDD: "250", // Maksimum HDD //Nilai ini untuk kapasitas maksimum 500 GB, jika ingin 1000 GB maka rubah jadi 100, dst..
    MaxIP: "36", // Maksimum IP

    //Pilihan Buy Now

    BuyNowLink: "https://#",

    //Konfigurasi CPU, RAM, HDD, IP dan Bandwidth
    cpuID: "&configoption[199]=",
    ramID: "&configoption[194]=",
    hddID: "&configoption[193]=",
    ipID: "&configoption[198]=",

    //Konfigurasi Control Panel
    cpID: "&configoption[196]=",

    //Harga Windows
    windowsPrice: "-180000",

    //Konfigurasi
    cpYesID: "904",
    cpNoID: "905",

    //-----------Tambahan------------//

    //Diskon.
    discount: "0",

    //Pilihan default
    defaultPreset: "xs", //bisa pilih xs, s, m, atau xl

    //Tips Konten Bawaan
    TipsXS: "Ideal untuk...",
    TipsS: "Ideal untuk...",
    TipsM: "Ideal untuk...",
    TipsL: "Ideal untuk...",
    TipsXL: "Ideal untuk...",

    //Beres..
  });
});
