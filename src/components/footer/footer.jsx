import "../footer/style.css";

function Footer() {
  return (
    <div className="footer">
      <p>
        &copy; 2023 Todos os direitos reservados - Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/higorini/"
          className="creator-link"
          target="blank"
        >
          Higor M. dos Santos
        </a>
        .
      </p>
    </div>
  );
}

export default Footer;
