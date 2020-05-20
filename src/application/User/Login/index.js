import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import { Container, LogoImg, LogoContainer, LoginContainer } from "./style";
import {saveSentStatus,loginByVcode,sentVcode} from "./store/actions";
import LoginForm from "./LoginForm";
import PhoneForm from "./PhoneForm";


const Login = () => {

  
  const [inPhone, setInPhone] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const checkBoxRef = useRef();

  const dispatch = useDispatch()
  // const userInfo = useSelector(({user})=>user.userInfo)
  const sentStatus = useSelector(({user})=>user.sentStatus)
  const loginStatus = useSelector(({user})=>user.loginStatus)
  const history = useHistory()
  useEffect(() => {
    if (loginStatus) {
      history.push("/recommend");
    }
  }, [loginStatus,history]);

  const jumpToIndex = () => {
    history.push("/recommend");
  };

  const jumpToLogin = method => {
    if (!agreed) {
      // alert("请同意条款");
      checkBoxRef.current.classList.add("shake-horizontal");
      setTimeout(() => {
        checkBoxRef.current.classList.remove("shake-horizontal");
      }, 500);
      return;
    }
    if (method === "phone") {
      setInPhone(true);
    }
  };

  const onPhoneBack = () => {
    setInPhone(false);
  };

  return (
    <>
      <CSSTransition in={!inPhone} timeout={500} classNames="push-out">
        <Container>
          <LogoContainer>
            <div>
              <LogoImg />
            </div>
          </LogoContainer>
          <LoginForm
            jumpToLogin={jumpToLogin}
            jumpToIndex={jumpToIndex}
            setAgreed={setAgreed}
            ref={checkBoxRef}
          />
        </Container>
      </CSSTransition>
      <CSSTransition
        in={inPhone}
        timeout={500}
        classNames="push-in"
        unmountOnExit
        onExited={() => dispatch(saveSentStatus(false))}
      >
        <LoginContainer>
          <PhoneForm
            // loginByPhone={LoginByPhoneDispatch}
            loginByVcode={(phone,vcode)=>dispatch(loginByVcode(phone, vcode))}
            onClickBack={onPhoneBack}
            sentVcode={(phone)=>dispatch(sentVcode(phone))}
            sentStatus={sentStatus}
          />
        </LoginContainer>
      </CSSTransition>
    </>
  );
};


export default React.memo(Login)
