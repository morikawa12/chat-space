## members テーブル

|Columu|Type|Option|
|------|----|------|
|user_id|interger|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user