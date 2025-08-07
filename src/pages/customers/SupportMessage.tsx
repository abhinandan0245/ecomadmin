import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import IconX from '../../components/Icon/IconX';
import IconDownload from '../../components/Icon/IconDownload';
import IconEye from '../../components/Icon/IconEye';
import IconSend from '../../components/Icon/IconSend';
import IconSave from '../../components/Icon/IconSave';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import IconCaretDown from '../../components/Icon/IconCaretDown';
  
import React, { ChangeEvent } from 'react';

// interface ImagePreview {
//   file: File;
//   preview: string;
// }

// interface Option {
//     value: string;
//     label: string;
// }
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  time: Date;
  status: "unread" | "resolved";
}

const initialMessages: Message[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Order Not Received",
    content: "Hi, I placed an order 3 days ago and haven’t received it yet...",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "unread",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    subject: "Return Request",
    content: "I'd like to return an item from my last order...",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "resolved",
  },
];
const SupportMessage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Add'));
    });
    const currencyList = ['USD - US Dollar', 'GBP - British Pound', 'IDR - Indonesian Rupiah', 'INR - Indian Rupee', 'BRL - Brazilian Real', 'EUR - Germany (Euro)', 'TRY - Turkish Lira'];


  

   
    

   


    



    // support message 
    const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [filter, setFilter] = useState<"all" | "unread" | "resolved">("all");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    setReplyContent("");
  };

  const sendReply = () => {
    alert(`Reply sent to ${replyingTo?.email}:\n${replyContent}`);
    setReplyingTo(null);
    setReplyContent("");
  };

  const markAsResolved = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: "resolved" } : msg
      )
    );
  };

  const filteredMessages = messages.filter((msg) =>
    filter === "all" ? true : msg.status === filter
  );


    return (
        <div className="flex  flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
            <div className="text-lg ps-5 leading-none">Customers support Message</div>
                
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Customer Support Messages</h2>
        <select
          className="border px-3 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 border rounded bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{msg.subject}</h3>
                <p className="text-sm text-gray-600">
                  By: {msg.name} ({msg.email})
                </p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(msg.time))} ago
                </p>
                <p className="mt-2 text-gray-700">{msg.content}</p>
              </div>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleReply(msg)}
                  className="text-blue-600 hover:underline"
                >
                  Reply
                </button>
                {msg.status === "unread" && (
                  <button
                    onClick={() => markAsResolved(msg.id)}
                    className="text-green-600 hover:underline"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-2">
              Reply to {replyingTo.name}
            </h3>
            <textarea
              rows={4}
              className="w-full border rounded p-2 mb-4"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
               
            </div>
           
           {/* <div className='panel flex justify-center items-center'>
            <button className='btn btn-success w-52'>Save</button>
           </div> */}
        </div>
    );
};

export default SupportMessage;
