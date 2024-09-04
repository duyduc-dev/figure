(function ($) {
  "use strict";

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  var width = $(window).width();
  $(window).resize(function () {
    if (width > 767 && $(window).width() < 767) {
      location.reload();
    } else if (width < 767 && $(window).width() > 767) {
      location.reload();
    }
  });

  const elem = document.querySelector(".trending-box");
  const filtersElem = document.querySelector(".trending-filter");
  if (elem) {
    const rdn_events_list = new Isotope(elem, {
      itemSelector: ".trending-items",
      layoutMode: "masonry",
    });
    if (filtersElem) {
      filtersElem.addEventListener("click", function (event) {
        if (!matchesSelector(event.target, "a")) {
          return;
        }
        const filterValue = event.target.getAttribute("data-filter");
        rdn_events_list.arrange({
          filter: filterValue,
        });
        filtersElem.querySelector(".is_active").classList.remove("is_active");
        event.target.classList.add("is_active");
        event.preventDefault();
      });
    }
  }

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          700
        );
        return false;
      }
    }
  });

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });
})(window.jQuery);

const CardStorage = {
  init: () => {
    const data = localStorage.getItem("cart");
    if (!data) {
      localStorage.setItem("cart", "[]");
    }
  },
  addCart: (card, callback) => {
    try {
      const data = localStorage.getItem("cart");
      if (data) {
        const carts = JSON.parse(data);
        const find = carts.find((item) => item.id === card.id);
        if (!find) {
          carts.push(card);
          localStorage.setItem("cart", JSON.stringify(carts));
          callback?.();
        }
      }
    } catch (error) {}
  },
  removeCart: (id) => {
    try {
      const data = localStorage.getItem("cart");
      if (data) {
        const carts = JSON.parse(data) ?? [];
        const find = carts.findIndex((item) => item.id === id);
        if (find > -1) {
          carts.splice(find, 1);
          localStorage.setItem("cart", JSON.stringify(carts));
        }
      }
    } catch (error) {}
  },
  getCart: () => {
    try {
      const data = localStorage.getItem("cart");
      if (data) {
        const carts = JSON.parse(data);
        return carts;
      }
      return [];
    } catch (error) {
      return [];
    }
  },
};
CardStorage.init();

$(() => {
  const btnAddCard = $(".btn-add-card");
  const cartCount = $(".cart-count");
  const cartList = $(".cart-list");

  const renderCart = () => {
    cartList.html(
      CardStorage.getCart().map(
        (item) => ` <div class="cart-items mt-3">
      <!-- Example Item -->
      <div
        class="d-flex justify-content-between align-items-center border-bottom py-2"
      >
        <div class="d-flex w-100 justify-content-between cart-item">
          <div class="d-flex gap-3">
            <img src="${item.img}" alt="Product Image" class="img-fluid" style="width: 100px; border-radius: 8px" />
            <div class="details">
              <h5 class="mb-1">${item.title}</h5>
              <p class="mb-1">${item.price}</p>
              <input
                type="number"
                class="form-control"
                value="1"
                min="1"
                style="width: 80px"
              />
            </div>
          </div>
          <div><button class="btn btn-danger btn-remove-cart" data-id="${item.id}">Remove</button></div>
        </div>
      </div>
      <!-- Add more items here -->
    </div>`
      )
    );
    const btnREmoveItem = $(".btn-remove-cart");
    btnREmoveItem.click(() => {
      const id = btnREmoveItem.data("id");
      if (id) {
        CardStorage.removeCart(Number(id));
        cartCount.html(CardStorage.getCart().length);
        renderCart();
      }
    });
  };
  renderCart();
  cartCount.html(CardStorage.getCart().length);
  btnAddCard.click((r) => {
    r.preventDefault();
    CardStorage.addCart(currentProd, () => {
      cartCount.html(CardStorage.getCart().length);
    });
  });
});
