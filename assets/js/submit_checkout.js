

const scriptURL = https:"//script.google.com/macros/s/AKfycbwMy0k-nVkDt2XHbPgxy-KfRNOJKU-o8VJTT-z_nUVPkfBjV5ebOETH0wyn8DP89iwbJA/exec";

const form = document.getElementById("form_contact");
const checkout_items = document.getElementById("checkout_items");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  // ✅ التحقق من وجود form ووجود عناصر داخل السلة
  if (!form || !checkout_items || checkout_items.children.length === 0) {
    alert("❌ لا يمكن إرسال الطلب: تأكد من ملء البيانات وأن السلة غير فارغة.");
    return;
  }

  // ✅ إرسال البيانات
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      if (response.ok) {
        alert("✅ تم إرسال البيانات بنجاح!");
        form.reset();
        localStorage.removeItem("cart");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        alert("❌ حدث خطأ أثناء الإرسال.");
      }
    })
    .catch((error) => {
      console.error("❌ فشل الإرسال:", error);
      alert("❌ لم يتم إرسال البيانات. تحقق من الاتصال أو رابط Google Script.");
    });
});
