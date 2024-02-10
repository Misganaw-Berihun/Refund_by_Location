import { useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { Switch } from "@headlessui/react";
import { ethers } from "ethers";
import ComplianceContractABI from "../ComplianceContractABI.json";
const contractAddress = "0xABD275b4A0Fcef6Dbf78CE361E019Cd2d3457c7a";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  contractAddress,
  ComplianceContractABI,
  signer
);

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function CreateEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");

  async function registerDriver(
    driverAddress,
    name,
    targetLongitude,
    targetLatitude,
    radius,
    duration
  ) {
    const tx = await contract.registerDriver(
      driverAddress,
      name,
      targetLongitude,
      targetLatitude,
      radius,
      duration
    );
    await tx.wait();
    console.log("Driver registered successfully");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handle change");
    console.log("Name : " + name);
    console.log("Value: " + value);
    switch (name) {
      case "first-name":
        setFirstName(value);
        break;
      case "last-name":
        setLastName(value);
        break;
      case "EmployeeAddress":
        setEmployeeAddress(value);
        break;
      case "latitude":
        setLatitude(value);
        break;
      case "longitude":
        setLongitude(value);
        break;
      case "radius":
        setRadius(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerDriver(
      employeeAddress,
      `${firstName} ${lastName}`,
      Math.floor(parseFloat(latitude)),
      Math.floor(parseFloat(longitude)),
      Math.floor(parseFloat(radius)),
      1000
    );
    setFirstName("");
    setLastName("");
    setEmployeeAddress("");
    setLatitude("");
    setLongitude("");
    setRadius("");
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create Employee
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Enter the appropriate information
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={firstName}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="EmployeeAddress"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Employee Address
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="EmployeeAddress"
                id="EmployeeAddress"
                value={employeeAddress}
                onChange={handleChange}
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div>
              <label
                htmlFor="latitude"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Latitude
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="latitude"
                  id="latitude"
                  value={latitude}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="block w-21 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="longitude"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Longitude
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="longitude"
                  id="longitude"
                  value={longitude}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-21 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="radius"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Radius
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="radius"
                  id="radius"
                  value={radius}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="block w-20 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
}
