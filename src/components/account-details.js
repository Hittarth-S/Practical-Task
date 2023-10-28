import { Button } from "react-bootstrap";

import moment from "moment";

import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import actions from "../redux/actions/userAction";

const AccountDetails = (props) => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state?.user?.user);

    return <div className="row flex-column-reverse flex-md-row">
        <div className="col-xl-6 col-sm-12" >
            <form className="contact-form">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-sm-12">
                        <div className="form-heading">
                            <h2>My Account</h2>
                            <p> Take a quick look at your information and make any necessary edits. </p>
                        </div>
                    </div>
                </div>
                <div className="row border-top py-3">
                    <div className="col-12 text-center">
                        <h5>{userDetails?.firstName} {userDetails?.lastName}</h5>
                        <p> Joined on {moment(userDetails?.createdAt).format("MMM Do' YYYY")}</p>

                    </div>

                </div>
                <div className="row border-top py-3">
                    <div className="col-xl-6 col-lg-6 col-sm-12">
                        <strong>Email Address</strong>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-sm-12 flex">
                        <a style={{ textDecoration: 'none', color: 'black', textAlign: 'end' }}
                            href={`mailto:` + userDetails?.email}><p> {userDetails?.email}</p></a>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-sm-12">
                        <strong>Phone Number</strong>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-sm-12 flex">
                        <a style={{ textDecoration: 'none', color: 'black', textAlign: 'end' }}
                            href={`tel:` + userDetails?.mobile}><p> {userDetails?.mobile}</p></a>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-sm-12" onClick={() => {
                        dispatch(actions.setToken(null));
                        dispatch(actions.setUser(null));
                        dispatch(actions.setLoggedIn(false));
                    }}>
                        <Button className="submit-btn">Logout</Button>
                    </div>
                </div>
            </form>
        </div>
        <div className="col-xl-6 col-sm-12" >
            <img
                className="account-image"
                src={require("../assets/account-details.png")}
                alt="Account Details"
            />
        </div>
    </div>
}
export default AccountDetails;