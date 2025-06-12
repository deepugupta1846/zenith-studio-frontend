import Corprate from "../Corprate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { showAlert } from "../../enum/SweetAlert";

export default function ActivatePage() {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  const navigate = useNavigate();

  useEffect(() => {
    if (userid) {
      console.log("Token from URL:", userid);
      activateUser();
    }
  }, [userid]); // Include token in dependency array

  const activateUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/verify-user/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Verification failed");

      await showAlert({
        title: 'Account Verified',
        subtitle: 'Your account has been successfully verified!',
        confirmText: 'Ok',
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      await showAlert({
        title: 'Verification Failed',
        subtitle: 'Unable to verify your account. Please try again.',
        confirmText: 'Close',
      });
    }
  };

  return (
    <Corprate>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Verifying your account...</h1>
        </div>
      </div>
    </Corprate>
  );
}
