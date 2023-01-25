const Tutorial = () => {
  return (
    <div className="nes-container is-dark with-title" style={{ height: "90%" }}>
      <p className="title">Tutorial</p>
      <div style={{ maxHeight: "100%", overflow: "scroll" }}>
        <p>S-Bridge, is a variation of Contract Bridge.</p>
        <p>S-Bridge can be broken down into 2 phases:</p>
        <p>Phase 1 : Bidding</p>
        <p>Phase 2 : Trick Taking</p>
        <br />
        <p>Bidding Phase:</p>
        <p>Each player take turn bidding for the trump suit.</p>
        <p>When it's your turn, you can either bid higher, or pass</p>
        <br />
        <p>Trick Taking Phase:</p>
        <p>In each round(trick)</p>
      </div>
    </div>
  );
};

export default Tutorial;
