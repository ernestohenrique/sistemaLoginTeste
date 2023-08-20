import { useContext, useState } from "react";
import Header from "../../components/Header/header";
import Title from "../../components/Title/title";

import { FiSettings, FiUpload } from "react-icons/fi";
import { Image } from "react-bootstrap";
import avatar from "../../img/avatar/avatarUser.png";
import { AuthContext } from "../../contexts/auth";

import { db, storage } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";

import { toast } from "react-toastify";

import "./profile.css";

export default function Profile() {
  //pegar os dados criar um contexto
  const { user, storageUser, setUser, logout } = useContext(AuthContext);

  //criar um useState e verificar o avatar
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);
  const [email /*setEmail*/] = useState(user && user.email);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    try {
      console.log("Teste 1");
      const currentUid = user.uid;
      const storage = getStorage();

      const uploadRef = ref(
        storage,
        `images/${currentUid}/${imageAvatar.name}`
      );
      console.log("Teste 2");

      // Upload da imagem
      await uploadBytes(uploadRef, imageAvatar);

      // Obter URL de download
      const downloadURL = await getDownloadURL(uploadRef);
      console.log("Teste 3");

      // Atualizar os dados do usuário no Firestore
      const docRef = doc(db, "user", user.uid);
      await updateDoc(docRef, {
        avatarUrl: downloadURL,
        nome: nome,
      });

      // Atualizar os dados no estado do aplicativo
      let updatedUserData = {
        ...user,
        nome: nome,
        avatarUrl: downloadURL,
      };
      setUser(updatedUserData);
      storageUser(updatedUserData);

      toast.success("Atualizado com Sucesso!");
      console.log("Teste 4");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      // Lide com o erro de acordo com as necessidades do seu aplicativo
      toast.error("Erro ao atualizar. Por favor, tente novamente.");
    }
  }

  //----

  /*
  async function handleUpload() {
    console.log("Teste 1");
    const currentUid = user.uid;
    const storage = getStorage();

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
    console.log("Teste 2");
    const uploadTask = uploadBytes(uploadRef, imageAvatar).then(() => {
      getDownloadURL(imageAvatar.ref).then(async (downLoadURL) => {
        let urlFoto = downLoadURL;
        console.log("Teste 3");
        const docRef = doc(db, "user", user.uid);
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome,
        }).then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFoto,
          };
          console.log("Teste 4");
          setUser(data);
          storageUser(data);
          toast.success("Atualizado com Sucesso!");
        });
      });
    });
  }

  //_____________________

  async function handleUpload() {
    console.log("Teste 1");
    try {
      const currentUid = user.uid;
      const uploadRef = ref(
        storage,
        `images/${currentUid}/${imageAvatar.name}`
      );
      console.log("Teste 2");
      const snapshot = await uploadBytes(uploadRef, imageAvatar);
      const downLoadURL = await getDownloadURL(snapshot.ref);
      console.log("Teste 3");
      const docRef = doc(db, "user", user.uid);
      await updateDoc(docRef, {
        avatarUrl: downLoadURL,
        nome: nome,
      });
      console.log("Teste 4");
      const updatedUser = {
        ...user,
        nome: nome,
        avatarUrl: downLoadURL,
      };
      console.log("Teste 5");
      setUser(updatedUser);
      storageUser(updatedUser);

      toast.success("Atualizado com Sucesso!");
    } catch (error) {
      console.error("Erro durante o processo de upload:", error);
      // Tratar o erro, se necessário
    }
  }

  //____________________
  */
  async function handleSubmit(e) {
    e.preventDefault();

    if (imageAvatar === null && nome !== "") {
      //Atulalizar apenas o nome do user
      const docRef = doc(db, "user", user.uid);
      await updateDoc(docRef, {
        nome: nome,
      }).then(() => {
        let data = {
          ...user,
          nome: nome,
        };
        setUser(data);
        storageUser(data);
        toast.success("Atualizado com Sucesso!");
      });
    } else if (nome !== "" && imageAvatar !== null) {
      //Atualizar nome e foto
      handleUpload(user, imageAvatar);
    }
  }

  return (
    <div>
      <Header></Header>
      <div className="content">
        <Title name="Minha Conta">
          <FiSettings size={25}></FiSettings>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25}></FiUpload>
              </span>
              <input type="file" accept="image/*" onChange={handleFile}></input>
              <br />
              {avatarUrl === null ? (
                <Image
                  id="img"
                  src={avatar}
                  alt="Foto do perfil"
                  width={250}
                  height={250}
                ></Image>
              ) : (
                <Image
                  id="img"
                  src={avatarUrl}
                  alt="Foto do perfil"
                  width={250}
                  height={250}
                ></Image>
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            ></input>

            <label>Email</label>
            <input type="text" value={email} disabled={true}></input>

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
