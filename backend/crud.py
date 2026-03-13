from database import get_connection


def create_user(user):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        (user.name, user.email)
    )

    conn.commit()
    conn.close()


def get_users():
    conn = get_connection()
    cursor = conn.cursor()

    users = cursor.execute("SELECT * FROM users").fetchall()

    conn.close()
    return [dict(user) for user in users]


def get_user(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    user = cursor.execute(
        "SELECT * FROM users WHERE id=?",
        (user_id,)
    ).fetchone()

    conn.close()

    if user:
        return dict(user)
    return None


def update_user(user_id, user):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE users SET name=?, email=? WHERE id=?",
        (user.name, user.email, user_id)
    )

    conn.commit()
    conn.close()


def delete_user(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM users WHERE id=?",
        (user_id,)
    )

    conn.commit()
    conn.close()