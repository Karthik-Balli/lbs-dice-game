from pydantic import BaseModel


class ScoreUpdate(BaseModel):
    user_id: str
    delta: int