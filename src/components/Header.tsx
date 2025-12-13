import { logoutUser } from "@/functions/user.functions";
import { useAuthStore } from "@/stores.ts/authStore";
import { Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { NavbarComponent } from "./Navbar";


const Header = () => {
  const router=useRouter()
  const logoutFunc = useServerFn(logoutUser);
  const handleClick = () => {
    logoutFunc().then(()=>{
  useAuthStore.setState({isAuthenticated:false,user:null})
      router.navigate({to:"/account"})
    })
  };

  return (
    <div>

<NavbarComponent/>

    </div>
  );
};

export default Header;
