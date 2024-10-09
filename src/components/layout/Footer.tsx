const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-100 flex flex-col items-center justify-center text-center h-min-[10vh] p-10">
      <div className="max-w-[80%]">
        <div className="copyright  w-full">
          <a href="#privacy-policy" className="text-cyan-200">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#legal-notice" className="text-cyan-200">
            Legal Notice
          </a>{' '}
          |{' '}
          <a href="#terms-of-use" className="text-cyan-200">
            Terms of Use
          </a>
        </div>
      </div>
      <div className="line-divider my-[10px]"></div>
      <div className="max-w-[80%]">
        <p className="w-full">
          Copyright © 2024, AIVehicleRental. All rights reserved.
        </p>
        <p className="w-full">
          AIVehicleRental is a vehicle rental site for a University Asignation.
        </p>
        <p className="w-full">
          Do not add private information here and Do not make use of this code
          nor site without it's owners permissions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
