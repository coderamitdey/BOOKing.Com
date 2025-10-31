import React from "react";

const About = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">

      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
            About BOOKing.Com
          </h1>
          <p className="text-gray-700 text-lg">
            We are dedicated to providing the best hotel booking experience.
            Explore luxury stays, budget-friendly hostels, and unique resorts
            with ease. Our platform ensures seamless booking and reliable
            service worldwide.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co.com/twkdNrT3/room2.jpg"
            alt="About us"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

    
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Our Mission</h2>
          <p className="text-gray-700">
            To make hotel booking easy, reliable, and enjoyable for travelers
            around the globe. We aim to provide the best user experience with
            trusted information and seamless booking.
          </p>
        </div>
        <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Our Vision</h2>
          <p className="text-gray-700">
            To be the leading platform for travelers seeking quality
            accommodations worldwide. We strive to connect guests with
            exceptional hotels and create unforgettable stays.
          </p>
        </div>
      </section>

     
      <section>
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-gray-600">
              Reliable information and secure bookings for every guest.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              We prioritize user experience and satisfaction above everything.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Constantly improving our platform for a seamless booking journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
