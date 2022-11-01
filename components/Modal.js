import $ from "jquery";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// recoil
import { useSetRecoilState } from "recoil";
import api from "../api";
import { userAtom } from "../atoms/userAtom";
import { toast, ToastContainer } from "react-toastify";
export default function Modal(props) {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [showRegister, setShowRegister] = useState(false);
  const modalRef = useRef();
  useEffect(() => {
    if (document && props.showModal) {
      // block scroll
      var body = $("html, body");
      body.stop().animate({ scrollTop: 0 }, 500, "swing", function () {
        document.body.style.overflow = "hidden";
      });

      //   scroll to top
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.showModal]);

  const handleCreateAccount = async (name, email, password, telClient) => {
    await api.post("/auth/register", {
      name,
      email,
      password,
      telClient
    });
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });
      if (res.status === 200) {
        setUser({ id: res.data.id, role: res.data.role });
        localStorage.setItem("token", res.data.token);
        props.setShowModal(false);
        if (res.data.role === "expediteur") {
          router.push("/dashboard/bordereau");
        } else if (res.data.role === "admin") {
          router.push("/admin/");
        } else if (res.data.role === "livreur") {
          router.push("/livreur");
        }
      }
    } catch (err) {
      toast.error("Email ou le mot de passe sont incorrects ");
    }
  };

  return (
    <div>
      {!showRegister ? (
        <div className={`modal ${props.showModal && "show"}`}>
          <div className="modal-content-min" ref={modalRef}>
            <div
              className="modal-header"
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
            >
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  props.setShowModal(false);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(async (data) => {
                  handleLogin(data.email, data.password);
                  props.setShowModal(false);
                })}
              >
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />

                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <span>
                    <a
                      className="register"
                      onClick={() => {
                        setShowRegister(true);
                        props.setShowModal(false);
                      }}
                    >
                      Vous n&apos;avez encore de compte?
                    </a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="save-login"
                  style={{ position: "absolute", right: 20 }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className={`modal ${showRegister && "show"}`}>
          <div className="modal-content" ref={modalRef}>
            <div
              className="modal-header"
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
            >
              <h5 className="modal-title">Register</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  props.setShowModal(false);
                  setShowRegister(false);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const name = e.target.elements.name.value;
                  const email = e.target.elements.email.value;
                  const password = e.target.elements.password.value;
                  const telClient = e.target.elements.telClient.value;
                  await handleCreateAccount(name, email, password, telClient);
                  // props.setShowModal(false);
                  setShowRegister(false);
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                  />
                  <input
                    type="tel"
                    name="telClient"
                    defaultValue={"+216"}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Telephone"
                  />
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  />

                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <span>
                    <a
                      className="register"
                      onClick={() => {
                        setShowRegister(false);
                        props.setShowModal(true);
                      }}
                    >
                      Vous avez déja un compte ?
                    </a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="save-login"
                  style={{ position: "absolute", right: 20 }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
