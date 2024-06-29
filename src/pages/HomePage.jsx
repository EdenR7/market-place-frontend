import React, { useEffect, useRef, useState } from "react";

function HomePage() {
  const [isVisible, setIsVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver( // callback and threshold
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prevState) => ({
            ...prevState,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.5 }
    );

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => {
      if (section1Ref.current) observer.unobserve(section1Ref.current);
      if (section2Ref.current) observer.unobserve(section2Ref.current);
      if (section3Ref.current) observer.unobserve(section3Ref.current);
    };
  }, []);

  return (
    //
    <div className=" mt-20 px-6 break-400px:px-12 font-montserrat">
      <div className=" flex flex-col justify-center w-full px-4 h-600 bg-repeat-x bg-[url('https://img.freepik.com/free-photo/shopping-carts-facing-each-other_23-2148288223.jpg?w=900&t=st=1719486501~exp=1719487101~hmac=2cf21c0c90fd8871a23cbc8544515f046c23bb0f3e24dd75bc77506d7fd28f4f')]">
        <h1 className=" text-center font-bold text-5xl text-primary-110 mb-8">
          Welcome To BazaarHub!
        </h1>
        <p className="text-3xl mb-6 text-center  font-semibold">
          Join our community of happy shoppers and start saving today!
        </p>
        <p className="text-3xl text-center font-semibold">
          Start using our platform today and sell your stuff to a wide audience!
        </p>
      </div>
      <div className="min-h-screen">
        <section className="bg-yellow-50 py-12 px-4 ">
          <div
            id="section1"
            ref={section1Ref}
            className={`max-w-7xl mx-auto h-600 flex flex-col justify-center text-center transition-all duration-500 ease-in ${
              isVisible.section1
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              About BazaarHub
            </h2>
            <p className="text-lg text-gray-700">
              Discover a new way to shop and sell with BazaarHub, the ultimate
              online destination for buyers and sellers. Our platform is
              designed to connect you with the best deals, freshest products,
              and a vibrant community of shoppers. Whether you're looking for
              the latest trends, everyday essentials, or unique finds, our
              marketplace has it all. Explore a wide range of categories, enjoy
              seamless browsing, and experience the joy of finding exactly what
              you need, all in one place.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-12 px-4">
          <div
            id="section2"
            ref={section2Ref}
            className={`max-w-7xl mx-auto h-600 flex flex-col justify-center text-center transition-all duration-500 ease-in ${
              isVisible.section2
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Why Shop with BazaarHub?
            </h2>
            <p className="text-lg text-gray-700">
              At BazaarHub, we prioritize your satisfaction and convenience. Our
              user-friendly interface ensures a hassle-free shopping experience,
              while our secure payment system guarantees peace of mind. We are
              committed to offering competitive prices, exclusive deals, and a
              diverse selection of high-quality products. Plus, our dedicated
              customer support team is always here to assist you with any
              questions or concerns. Shop with confidence and discover the
              difference that sets us apart from the rest.
            </p>
          </div>
        </section>

        <section className="bg-yellow-50 py-12 px-4">
          <div
            id="section3"
            ref={section3Ref}
            className={`max-w-7xl mx-auto h-600 flex flex-col justify-center text-center transition-all duration-1000 ease-in-out ${
              isVisible.section3
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Start Selling Today!
            </h2>
            <p className="text-lg text-gray-700">
              Unlock your potential and reach a wider audience by becoming a
              seller on BazaarHub. Our platform offers you the tools and support
              you need to showcase your products and grow your business. Enjoy
              the flexibility to manage your store, track sales, and engage with
              customers directly. Whether you're a small business owner, a local
              artisan, or simply looking to declutter, our marketplace provides
              the perfect space to connect with buyers who appreciate what you
              have to offer. Start selling today and join our thriving community
              of sellers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
