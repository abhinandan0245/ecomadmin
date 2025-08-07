import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';



const InvoiceSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Add'));
    });


   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);


const [taxRate, setTaxRate] = useState<number>(0);
const [taxName, setTaxName] = useState<string>('GST');


 


    return (
        <div className="flex  flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
            <div className="text-lg ps-5 leading-none">Invoice Setting</div>
                
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
               {/* tax configuration  */}


               <div className="px-5 mb-6">
    <h2 className="text-lg font-semibold mb-4">Tax Configuration</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium mb-1">Tax Name</label>
            <input
                type="text"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
                className="form-input w-full"
                placeholder="Enter tax name (e.g., GST, VAT)"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
            <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                className="form-input w-full"
                placeholder="Enter tax rate"
                min="0"
                step="0.01"
            />
        </div>
    </div>
</div>

            </div>

            {/* tamplate selection */}

                <div className="my-5">
           <div className='grid grid-cols-2 gap-6'>
                
                {/* tamplate 1  */}
                
                <div  onClick={() => setSelectedTemplate(1)}
          className={`max-w-3xl mx-auto bg-white p-10 shadow-md rounded-xl font-sans cursor-pointer transition border-4 ${
            selectedTemplate === 1 ? 'border-green-500' : 'border-transparent'
          }`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600">INVOICE</h1>
        <div className="text-right">
          <p className="text-sm">Invoice Number: 00000</p>
          <p className="text-sm">DATE: 26/10/22</p>
        </div>
      </div>

      <div className="flex justify-between text-sm mb-6">
        <div>
          <h2 className="font-bold mb-1">BILL TO</h2>
          <p>Jhon Harnys</p>
          <p>123, Street, City, 1234</p>
          <p>+00 123 456 789</p>
        </div>
        <div>
          <h2 className="font-bold mb-1">BILL FROM</h2>
          <p>Healthy Food</p>
          <p>123, Street, City, 1234</p>
          <p>+00 123 456 789</p>
        </div>
      </div>

      <table className="w-full text-sm mb-6">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2">SNO</th>
            <th className="text-left py-2">Item</th>
            <th className="text-left py-2">PRICE</th>
            <th className="text-left py-2">QTY</th>
            <th className="text-left py-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Cassiopeia', 10],
            ['Gemini', 15],
            ['Leo', 20],
            ['Libra', 10],
            ['Orion', 20],
            // ['Pisces', 15],
            // ['Capricorn', 10],
            // ['Aries', 15],
          ].map(([name, price], index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{name}</td>
              {/* <td className="py-2">₹{price.toFixed(2)}</td> */}
              <td className="py-2">1</td>
              {/* <td className="py-2">₹{price.toFixed(2)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end text-sm mb-6">
        <table className="text-right">
          <tbody>
            <tr>
              <td className="pr-4 font-bold">SUBTOTAL:</td>
              <td>₹100.00</td>
            </tr>
            <tr>
              <td className="pr-4 font-bold">TAX:</td>
              <td>₹00.00</td>
            </tr>
            <tr>
              <td className="pr-4 font-bold">SHIPPING RATE:</td>
              <td>₹00.00</td>
            </tr>
            <tr>
              <td className="pr-4 font-bold">DISCOUNT:</td>
              <td>₹00.00</td>
            </tr>
            <tr>
              <td className="pr-4 font-bold">TOTAL:</td>
              <td>₹100.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-sm mb-6">
        <h2 className="font-bold mb-1">PAYMENT INFO</h2>
        <p><span className="font-semibold">Account:</span> 00000000 A/C</p>
        <p><span className="font-semibold">Name:</span> Healthy Food</p>
        <p><span className="font-semibold">Details:</span> Add your details</p>
      </div>

      <div className="text-xs text-gray-600">
        <h2 className="font-bold mb-1">LEGAL TERMS</h2>
        <p>
          These 88 constellations divide the entire night sky as seen from Earth. Star maps are made from the brightest stars, and the patterns they form give rise to the constellation names.
        </p>
      </div>
    </div>
                {/* template 2  */}
              <div onClick={() => setSelectedTemplate(2)}
          className={`max-w-3xl min-h-screen bg-gray-100 rounded-xl flex justify-center cursor-pointer transition border-4 ${
            selectedTemplate === 2 ? 'border-green-500' : 'border-transparent'
          }`}>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="w-1/3 bg-[#003049] text-white p-6">
          <div className="text-2xl font-bold mb-10">Your LOGO</div>
          <div className="mb-10">
            <h3 className="font-bold text-sm uppercase mb-2">FROM</h3>
            <p className="text-sm leading-6">
              Delizia Foods Inc.<br />
              324 Avenue, Hudson Plaza<br />
              Los Angeles, CA 90001<br />
              United States of America<br />
              www.deliziafoods.com<br />
              Phone: +1 234 567890
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase mb-2">TO</h3>
            <p className="text-sm leading-6">
              Marcus Rochester<br />
              Director Finance<br />
              Saluna Premier Vending Machines<br />
              75400, Porter Avenue<br />
              New York, NY
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-orange-500 mb-1">INVOICE</h1>
              <p className="text-sm text-gray-600">INVOICE NO. INV-003</p>
            </div>
            <div className="text-sm text-gray-700">
              <p><strong>INVOICE DATE:</strong> May 25, 2022</p>
              <p><strong>DUE DATE:</strong> April 1, 2022</p>
            </div>
          </div>

          <table className="w-full mb-6 text-sm border-t border-b border-gray-300">
            <thead className="bg-orange-500 text-black">
              <tr>
                <th className="text-left p-2">S.NO</th>
                <th className="text-left p-2">ITEM</th>
                <th className="text-left p-2">QUANTITY</th>
                <th className="text-left p-2">PRICE</th>
                <th className="text-left p-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pringles (Cheese)", 90, "₹5", "₹450"],
                ["Lemon n Lime Sip", 100, "₹2", "₹200"],
                ["Peach Ice Tea", 120, "₹1.5", "₹180"],
                ["Transportation & Logistics", 30, "₹10", "₹300"],
              ].map(([item, qty, price, amount], idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{item}</td>
                  <td className="p-2">{qty}</td>
                  <td className="p-2">{price}</td>
                  <td className="p-2">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table> 

          <div className="text-sm text-gray-700 mb-6">
            <p><strong>Subtotal:</strong> ₹1130</p>
            <p><strong>Discount (7%):</strong> ₹79.1</p>
            <p><strong>Tax Rate:</strong> 16%</p>
            <p><strong>Total Tax:</strong> ₹180.8</p>
          </div>

          <div className="text-xl font-bold text-right text-gray-800 mb-6">
            GRAND TOTAL: ₹1231.7
          </div>

          <div className="text-orange-500 font-semibold text-lg mb-2">
            Thank you for our partnership!
          </div>

          <div className="text-sm text-gray-700">
            <p><strong>ACCOUNT DETAILS:</strong></p>
            <p>Bank Name: Bank of America</p>
            <p>Account Title: Delizia Foods</p>
            <p>Account No: 1234567890</p>
            <p>SWIFT Code: X123</p>
          </div>
        </div>
      </div>
    </div>

           </div>
            </div>
            
           
           <div className='panel flex justify-center items-center text-red-500'>
            <button className='btn btn-success w-52'>Save</button>
           </div>
        </div>
    );
};

export default InvoiceSetting;
