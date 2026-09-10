import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (
    userData: User,
    token: string
  ) => void;

  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

// IMPORTANT: Apna actual admin email yahan rakho
const ADMIN_EMAIL = "krishk99973@gmail.com";

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);


  // =====================================
  // LOAD USER AFTER PAGE RELOAD
  // =====================================

  useEffect(() => {

    const loadUser = () => {

      try {

        const savedUser =
          localStorage.getItem("user");

        const savedToken =
          localStorage.getItem("token");


        if (savedUser && savedToken) {

          const parsedUser = JSON.parse(savedUser);


          // Admin check always email se hoga
          const updatedUser: User = {

            ...parsedUser,

            isAdmin:
              parsedUser.email
                ?.toLowerCase()
                .trim() ===
              ADMIN_EMAIL
                .toLowerCase()
                .trim(),

          };


          setUser(updatedUser);

          setToken(savedToken);


          // Update corrected user in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );

        }

      } catch (error) {

        console.error(
          "Auth loading error:",
          error
        );

        localStorage.removeItem("user");

        localStorage.removeItem("token");

      } finally {

        setLoading(false);

      }

    };


    loadUser();

  }, []);


  // =====================================
  // LOGIN
  // =====================================

  const login = (
    userData: User,
    authToken: string
  ) => {

    const updatedUser: User = {

      ...userData,

      // Force admin check
      isAdmin:
        userData.email
          ?.toLowerCase()
          .trim() ===
        ADMIN_EMAIL
          .toLowerCase()
          .trim(),

    };


    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );


    localStorage.setItem(
      "token",
      authToken
    );


    setUser(updatedUser);

    setToken(authToken);

  };


  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setToken(null);

  };


  // =====================================
  // PROVIDER
  // =====================================

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


// =====================================
// CUSTOM HOOK
// =====================================

export const useAuth = () => {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used within an AuthProvider"
    );

  }


  return context;

};