/*! Cloud Pricing Slider | (c) 1014 QsThemes.com
// Licensed Under codecanyon license aggrement. // http://codecanyon.net/licensess
*/

(function ($) {
  $.fn.extend({
    qsSlider: function (options) {
      var defaults = {
        // Harga
        PriceBase: "0", // Harga total seluruh item HDD 20GB
        PriceCPU: "130.000", // per bulan per unit
        PriceRAM: "110.000", // per bulan per 1024 MB
        PriceHDD: "0.9", // per bulan per 10 GB
        PriceIP: "35000", // per bulan per unit

        maxHoursMth: "744",

        // Nilai Maksimum slider
        MaxCPU: "32", // Maksimum CPU
        MaxRAM: "123", // Maksimum RAM // Harus + 2 jika ingin maksimum RAM 16 GB maka setting jadi 18 dst..
        MaxHDD: "250", // Maksimum HDD //Nilai ini untuk kapasitas maksimum 500 GB, jika ingin 1000 GB maka rubah jadi 100, dst..
        MaxIP: "36", // Maksimum IP
        //Pilihan Buy Now
        BuyNowLink: "",

        //ID dari pilihan konfigurasi
        cpuID: "",
        ramID: "",
        hddID: "",
        cpID: "",
        ipID: "",

        //Nilai Control panel
        cpYesID: "",
        cpNoID: "",

        //Harga Operating System
        windowsPrice: "-180000",

        //Diskon
        discount: "0",

        //Tooltips konten
        TipsXS: "",
        TipsS: "",
        TipsM: "",
        TipsL: "",
        TipsXL: "",

        //Pilihan konfigurasi Bawaan
        defaultPreset: "xs",
      };

      var o = $.extend(defaults, options);

      this.each(function () {
        $(function () {
          // membuat kontrol.
          var ISpec = new qsSlider();

          $("div#qsSlider #QsControls div.slider").each(function (i, control) {
            var id = $(control).attr("id");

            $(control).slider({
              orientation: "horizontal",
              range: "min",
              min: parseFloat(ISpec.specification[id].min),
              max: parseFloat(ISpec.specification[id].max),
              step: parseFloat(ISpec.specification[id].step),
              slide: function (event, ui) {
                if (id == "cpu") {
                  ISpec.setCPU(ui.value);
                } else if (id == "ram") {
                  ISpec.setRAM(ui.value);
                } else if (id == "hdd") {
                  ISpec.setHDD(ui.value);
                } else if (id == "ip") {
                  ISpec.setIP(ui.value);
                } else if (id == "CPUauto") {
                  ISpec.setIP(ui.value);
                } else if (id == "RAMauto") {
                  ISpec.setIP(ui.value);
                }
                ISpec.updatePrice();
              },
            });
          });

          var checkbox = document.getElementById("checkbox");
          var delivery_div = document.getElementById("delivery");
          checkbox.onclick = function () {
            console.log(this);
            if (this.checked) {
              delivery_div.style["display"] = "block";
            } else {
              delivery_div.style["display"] = "none";
            }
          };

          //
          $("button#autoscale").on("click", function (e) {
            ISpec.updatePrice();
          });

          //
          $("div#qsSlider #panelstext").on("click", function (e) {
            e.preventDefault();
            $("div#qsSlider #panel").slider("option", "value", "1");
          });

          // .
          $("div#qsSlider #panel").slider({
            orientation: "vertical",
            min: parseFloat(0),
            max: parseFloat(1),
            step: parseFloat(1),
            change: function (event, ui) {
              ISpec.updatePrice();
            },
          });

          // .
          $("div#qsSlider #offerstext").on("click", function (e) {
            e.preventDefault();
            $("div#qsSlider #period").slider("option", "value", "1");
          });

          // .
          $("div#qsSlider #period").slider({
            orientation: "vertical",
            min: parseFloat(0),
            max: parseFloat(1),
            step: parseFloat(1),
            change: function (event, ui) {
              ISpec.updatePrice();
            },
          });

          //
          var presetNames = new Array();
          presetNames[0] = "xs";
          presetNames[1] = "s";
          presetNames[2] = "m";
          presetNames[3] = "l";
          presetNames[4] = "xl";

          //
          var presetTips = new Array();
          presetTips[0] = o.TipsXS;
          presetTips[1] = o.TipsS;
          presetTips[2] = o.TipsM;
          presetTips[3] = o.TipsL;
          presetTips[4] = o.TipsXL;

          for (var i = 0; i < presetNames.length; i++) {
            var id = presetNames[i];
            var presetClass = "product preset" + id.toLowerCase();

            $("div#presets").append(
              $("<div>")
                .addClass(presetClass)
                .append(
                  $("<button type='button' class='btn btn-sm'>")
                    .text(id)
                    .on("click", function (e) {
                      e.preventDefault();
                      ISpec.selectPreset($(this).text());
                    })
                    .hover(
                      function (e) {
                        //
                        var toolTip;
                        var presetText = $(this).text();
                        for (var j = 0; j < presetNames.length; j++) {
                          if (presetNames[j] == presetText) {
                            toolTip = presetTips[j];
                          }
                        }

                        if (toolTip != undefined && toolTip != "") {
                          var offsetTop =
                            $(this).offset().top -
                            $("div#qsSlider").offset().top;
                          $("div#tooltip div.text").text(toolTip);
                          $("div#tooltip").fadeIn();
                        }
                      },
                      function (e) {
                        $("div#tooltip").hide();
                      }
                    )
                )
            );
          }

          //
          ISpec.selectPreset(o.defaultPreset);
        });

        var qsSlider = function () {
          // Tweak slider steps
          var cpuslider = {
            min: 1, // Nilai min slider
            max: o.MaxCPU, // Nilai max slider
            step: 1, // Slider increments
          };

          var ramslider = {
            min: 1, // Nilai min slider
            max: o.MaxRAM, // Nilai max slider
            step: 1, // Slider increments
          };

          var hddslider = {
            min: 1, // Nilai min slider
            max: o.MaxHDD, // Nilai max slider
            step: 1, // Slider increments
          };

          var ipslider = {
            min: 1, // Nilai min slider
            max: o.MaxIP, // Nilai max slider
            step: 1, // Slider increments
          };

          // .
          var presetspec = {
            xs: { cpu: "1", ram: "1", hdd: "1", ip: "1" },
            s: { cpu: "1", ram: "2", hdd: "1", ip: "1" },
            m: { cpu: "4", ram: "4", hdd: "30", ip: "1" },
            l: { cpu: "12", ram: "6", hdd: "10", ip: "1" },
            xl: { cpu: "8", ram: "14", hdd: "30", ip: "1" },
          };

          // .
          this.specification = {
            cpu: cpuslider,
            ram: ramslider,
            hdd: hddslider,
            ip: ipslider,
          };

          //
          var pricespec = {
            baseprice: o.PriceBase,
            cpu_ghz_mo: o.PriceCPU,
            ram_gb_mo: o.PriceRAM,
            hdd_gb_mo: o.PriceHDD,
            ip_ghz_mo: o.PriceIP,
            max_hr_mo: o.maxHoursMth,
          };

          // Functions //

          // Setting nilai CPU.
          this.setCPU = function (sliderStep) {
            var units = "GHz";
            var sTotal = sliderStep + " " + units;

            // Dan box text.
            $("div.values div#cpuvalue").text(sTotal);

            // Lalu update slider
            $("div#qsSlider div#QsControls div#cpu").slider(
              "value",
              sliderStep
            );
          };

          // Setting nilai RAM.
          this.setRAM = function (sliderStep) {
            var value = sliderStep - 1;
            if (value == 0) {
              value = 512;
            }
            var units = value < 256 ? "GB" : "MB";
            var sTotal = value + " " + units;

            $("div.values div#ramvalue").text(sTotal);

            $("div#qsSlider div#QsControls div#ram").slider(
              "value",
              sliderStep
            );
          };

          // Setting nilai GB HDD Storage.
          this.setHDD = function (sliderStep) {
            var units = "GB";

            var value = sliderStep * 20 + 0;
            var sTotal = value + " " + units;
            // Dan box text.
            $("div.values div#hddvalue").text(sTotal);

            // Lalu update slider
            $("div#qsSlider div#QsControls div#hdd").slider(
              "value",
              sliderStep
            );
          };

          // Setting nilai IP.
          this.setIP = function (sliderStep) {
            var units = "Additional Public IP";
            var value = sliderStep - 1;
            if (value == 0) {
              value = 0;
            }
            var sTotal = value + " " + units;

            // Dan box text.
            $("div.values div#ipvalue").text(sTotal);

            // Lalu update slider
            $("div#qsSlider div#QsControls div#ip").slider("value", sliderStep);
          };

          this.selectPreset = function (presetName) {
            var presetData = $(presetspec).attr(presetName);
            this.setCPU(presetData.cpu);
            this.setRAM(presetData.ram);
            this.setHDD(presetData.hdd);
            this.setIP(presetData.ip);
            this.updatePrice();
          };

          //

          this.updatePrice = function () {
            var price = calculatePrice();
            $("div#QsPrice span#doller").text(price.doller);
            $("div#QsPrice div#btn-buynow").on("click", function (e) {
              e.preventDefault();
              window.location = buyURL();
            });

            checkValueForPreset();
          };

          //

          var calculatePrice = function () {
            var price = parseFloat(pricespec.baseprice);
            var cpu = parseInt($("div.values div#cpuvalue").text());
            var ram = parseInt($("div.values div#ramvalue").text());
            var hdd = parseInt($("div.values div#hddvalue").text());
            var ip = parseInt($("div.values div#ipvalue").text());
            var panel_is_nocp = parseInt(
              $("div#panelselector div#panel").slider("value")
            );
            var period_is_year = parseInt(
              $("div#periodselector div#period").slider("value")
            );
            var autoscale_cpu = parseInt($("#CPUauto").val(), 0);
            var autoscale_ram = parseInt($("#RAMauto").val(), 0);

            var maxHoursPerMonth = parseFloat(pricespec.max_hr_mo);

            var price1GHz = parseFloat(pricespec.cpu_ghz_mo);
            price += price1GHz * maxHoursPerMonth * cpu;

            var priceRamGHz = parseFloat(pricespec.ram_gb_mo);
            if (ram == 512) {
              price +=
                priceRamGHz * maxHoursPerMonth * ((0.5 * autoscale_ram) / 100);
            } else {
              price +=
                priceRamGHz * maxHoursPerMonth * ((ram * autoscale_ram) / 100);
            }

            var priceHddGHz = parseFloat(pricespec.hdd_gb_mo);
            price += priceHddGHz * maxHoursPerMonth * hdd;

            var priceIpGHz = parseFloat(pricespec.ip_ghz_mo);
            price += priceIpGHz * ip;

            if (panel_is_nocp) {
              price -= o.windowsPrice;
            }

            price = price * 0.001;

            var priceParts = price.toFixed(3).toString().split(",");
            return {
              doller: priceParts[0],
              price: price,
            };
          };

          //
          var buyURL = function () {
            //
            var ramAmount = $("div.values div#ramvalue")
              .text()
              .replace(/[^0-9]/gi, "");

            //
            if (ramAmount < 256) {
              ramAmount *= 1024;
            } else {
              ramAmount;
            }

            //
            var cpuAmount = $("div.values div#cpuvalue")
              .text()
              .replace(/[^0-9]/gi, "");
            var hddSize = $("div.values div#hddvalue")
              .text()
              .replace(/[^0-9]/gi, "");
            var ipAmount = $("div.values div#ipvalue")
              .text()
              .replace(/[^0-9]/gi, "");

            //

            //
            var bterms = $("#qsSlider #period").slider("value")
              ? "annually"
              : "monthly"; //
            var nocp = $("#qsSlider #panel").slider("value")
              ? o.cpYesID
              : o.cpNoID; //

            //
            var url =
              o.BuyNowLink +
              o.cpuID +
              cpuAmount +
              o.ramID +
              ramAmount +
              o.hddID +
              hddSize +
              o.ipID +
              ipAmount +
              o.cpID +
              nocp +
              "&billingcycle=" +
              bterms;
            return url;
          };

          //
          var checkValueForPreset = function () {
            //
            $("div#presets div.product .btn").removeClass("btn-primary");
            //
            for (i in presetspec) {
              var presetData = presetspec[i];
              var sliderCPU = $("div#QsControls div#cpu").slider("value");
              var sliderRAM = $("div#QsControls div#ram").slider("value");
              var sliderHDD = $("div#QsControls div#hdd").slider("value");
              var sliderIP = $("div#QsControls div#ip").slider("value");
              if (
                presetData.cpu == sliderCPU &&
                presetData.ram == sliderRAM &&
                presetData.hdd == sliderHDD &&
                presetData.ip == sliderIP
              ) {
                var presetClass = "preset" + i.toLowerCase();
                $("div#presets div.product .btn").removeClass("btn-primary");
                $("div#presets div." + presetClass + " .btn").addClass(
                  "btn-primary"
                );
              }
            }
          };
        };
      });

      //
      return this;
    },
  });

  $.fn.extend({
    qsSlider: $.fn.qsSlider,
  });
})(jQuery);

jQuery(document).ready(function (e) {
  jQuery(function () {
    jQuery(".select-os a").click(function (e) {
      jQuery(".select-os a").removeClass("active");
      jQuery(this).addClass("active");
      var rid = jQuery(this).attr("rid");
      if (rid == "windows") {
        jQuery("#panel").slider("value", 1);
      } else {
        jQuery("#panel").slider("value", 0);
      }
    });
  });

  jQuery(document).on("keyup keydown", "#CPUauto", function (e) {
    if (jQuery(this).val() < 1) {
      jQuery(this).val(1);
    }
    if (jQuery(this).val() > 100) {
      jQuery(this).val(100);
    }
  });

  jQuery(document).on("keyup keydown", "#RAMauto", function (e) {
    if (jQuery(this).val() < 1) {
      jQuery(this).val(1);
    }
    if (jQuery(this).val() > 100) {
      jQuery(this).val(100);
    }
  });
});
