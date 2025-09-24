/*
  //FORM JS 
    document.getElementById('registrationForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.querySelector('input[name="name"]').value.trim();
      const dob = document.querySelector('input[name="dob"]').value;
      const birthTime = document.querySelector('input[name="birthTime"]').value;
      const birthPlace = document.querySelector('input[name="birthPlace"]').value.trim();
      const mobile = document.querySelector('input[name="mobile"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();
      const question = document.querySelector('textarea[name="question"]').value.trim();

      if (name === "" || mobile === "") {
        alert("कृपया नाम और मोबाइल नंबर अनिवार्य रूप से भरें।");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        alert("कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें।");
        return;
      }

      if (email !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          alert("कृपया सही ईमेल आईडी दर्ज करें या इसे खाली छोड़ें।");
          return;
        }
      }

      const data = {
        name,
        dob,
        birthTime,
        birthPlace,
        mobile,
        email,
        question
      };

      // ✅ WhatsApp redirect
      window.location.href = 'https://chat.whatsapp.com/I6eyozWDH66KppJJZnKXup?mode=ac_t';

      // ✅ Send data to Google Sheet
      const scriptURL = 'https://script.google.com/macros/s/AKfycbziaE5vCb370pahjyVlIKH1pF5k-gdho5n2FUOd5XIKqdiyyE_7Pwrpc3FME3wGtzxn5g/exec';
      fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data)
      }).catch(error => {
        console.error('Error!', error.message);
      });
    });
*/

 let selectedSlot = "";

    // Slot selection
    document.querySelectorAll(".slot").forEach(slot => {
      slot.addEventListener("click", function() {
        document.querySelectorAll(".slot").forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        selectedSlot = this.textContent;
      });
    });

    // Function
    function sendToWhatsApp() {
      let date = document.getElementById("date").value;
      let name = document.getElementById("name").value;
      let mobile = document.getElementById("mobile").value;
      let problem = document.getElementById("problem").value;

      if(!date || !selectedSlot || !name || !mobile){
        alert("कृपया सभी विवरण भरें ✅");
        return;
      }

      // 👇 अपना WhatsApp नंबर यहाँ डालें (91 = India code)
      let gurujiNumber = "919899124949"; 

      // WhatsApp Message
      let message = `🌟 Slot Booking Request 🌟%0A
📅 Date: ${date}%0A
⏰ Time: ${selectedSlot}%0A
👤 Name: ${name}%0A
📞 Mobile: ${mobile}%0A
📝 Problem: ${problem}%0A
💳 Payment: Done via QR ✅`;

      // WhatsApp Open
      let url = `https://wa.me/${gurujiNumber}?text=${message}`;
      window.open(url, "_blank");

      // Google Sheet Save
      fetch("https://script.google.com/macros/s/AKfycbzq7AwTGdEczayl19zW8eNL6LrOvoCztt9kKMbagymmVERfHsrN0ri2BlhIirtWL3wb/exec", {
        method: "POST",
        body: JSON.stringify({
          date: date,
          slot: selectedSlot,
          name: name,
          mobile: mobile,
          problem: problem
        }),
        headers: { "Content-Type": "application/json" }
      })
      .then(res => console.log("Data saved in Google Sheet ✅"))
      .catch(err => console.error("Error:", err));
    }
